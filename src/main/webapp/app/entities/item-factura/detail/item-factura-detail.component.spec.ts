import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ItemFacturaDetailComponent } from './item-factura-detail.component';

describe('ItemFactura Management Detail Component', () => {
  let comp: ItemFacturaDetailComponent;
  let fixture: ComponentFixture<ItemFacturaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemFacturaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ itemFactura: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ItemFacturaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ItemFacturaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load itemFactura on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.itemFactura).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
