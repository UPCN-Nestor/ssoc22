import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ItemFacturaService } from '../service/item-factura.service';

import { ItemFacturaComponent } from './item-factura.component';

describe('ItemFactura Management Component', () => {
  let comp: ItemFacturaComponent;
  let fixture: ComponentFixture<ItemFacturaComponent>;
  let service: ItemFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ItemFacturaComponent],
    })
      .overrideTemplate(ItemFacturaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItemFacturaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ItemFacturaService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.itemFacturas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
