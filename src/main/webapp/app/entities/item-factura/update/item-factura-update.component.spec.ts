jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ItemFacturaService } from '../service/item-factura.service';
import { IItemFactura, ItemFactura } from '../item-factura.model';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { IFactura } from 'app/entities/factura/factura.model';
import { FacturaService } from 'app/entities/factura/service/factura.service';

import { ItemFacturaUpdateComponent } from './item-factura-update.component';

describe('ItemFactura Management Update Component', () => {
  let comp: ItemFacturaUpdateComponent;
  let fixture: ComponentFixture<ItemFacturaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let itemFacturaService: ItemFacturaService;
  let clienteService: ClienteService;
  let facturaService: FacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ItemFacturaUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ItemFacturaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItemFacturaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itemFacturaService = TestBed.inject(ItemFacturaService);
    clienteService = TestBed.inject(ClienteService);
    facturaService = TestBed.inject(FacturaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Cliente query and add missing value', () => {
      const itemFactura: IItemFactura = { id: 456 };
      const cliente: ICliente = { id: 38488 };
      itemFactura.cliente = cliente;

      const clienteCollection: ICliente[] = [{ id: 56873 }];
      jest.spyOn(clienteService, 'query').mockReturnValue(of(new HttpResponse({ body: clienteCollection })));
      const additionalClientes = [cliente];
      const expectedCollection: ICliente[] = [...additionalClientes, ...clienteCollection];
      jest.spyOn(clienteService, 'addClienteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemFactura });
      comp.ngOnInit();

      expect(clienteService.query).toHaveBeenCalled();
      expect(clienteService.addClienteToCollectionIfMissing).toHaveBeenCalledWith(clienteCollection, ...additionalClientes);
      expect(comp.clientesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Factura query and add missing value', () => {
      const itemFactura: IItemFactura = { id: 456 };
      const factura: IFactura = { id: 55338 };
      itemFactura.factura = factura;

      const facturaCollection: IFactura[] = [{ id: 43887 }];
      jest.spyOn(facturaService, 'query').mockReturnValue(of(new HttpResponse({ body: facturaCollection })));
      const additionalFacturas = [factura];
      const expectedCollection: IFactura[] = [...additionalFacturas, ...facturaCollection];
      jest.spyOn(facturaService, 'addFacturaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemFactura });
      comp.ngOnInit();

      expect(facturaService.query).toHaveBeenCalled();
      expect(facturaService.addFacturaToCollectionIfMissing).toHaveBeenCalledWith(facturaCollection, ...additionalFacturas);
      expect(comp.facturasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const itemFactura: IItemFactura = { id: 456 };
      const cliente: ICliente = { id: 53221 };
      itemFactura.cliente = cliente;
      const factura: IFactura = { id: 13768 };
      itemFactura.factura = factura;

      activatedRoute.data = of({ itemFactura });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(itemFactura));
      expect(comp.clientesSharedCollection).toContain(cliente);
      expect(comp.facturasSharedCollection).toContain(factura);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ItemFactura>>();
      const itemFactura = { id: 123 };
      jest.spyOn(itemFacturaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemFactura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemFactura }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(itemFacturaService.update).toHaveBeenCalledWith(itemFactura);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ItemFactura>>();
      const itemFactura = new ItemFactura();
      jest.spyOn(itemFacturaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemFactura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemFactura }));
      saveSubject.complete();

      // THEN
      expect(itemFacturaService.create).toHaveBeenCalledWith(itemFactura);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ItemFactura>>();
      const itemFactura = { id: 123 };
      jest.spyOn(itemFacturaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemFactura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(itemFacturaService.update).toHaveBeenCalledWith(itemFactura);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackClienteById', () => {
      it('Should return tracked Cliente primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackClienteById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackFacturaById', () => {
      it('Should return tracked Factura primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFacturaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
