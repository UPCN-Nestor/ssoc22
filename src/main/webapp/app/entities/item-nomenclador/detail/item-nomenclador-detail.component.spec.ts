import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ItemNomencladorDetailComponent } from './item-nomenclador-detail.component';

describe('ItemNomenclador Management Detail Component', () => {
  let comp: ItemNomencladorDetailComponent;
  let fixture: ComponentFixture<ItemNomencladorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemNomencladorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ itemNomenclador: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ItemNomencladorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ItemNomencladorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load itemNomenclador on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.itemNomenclador).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
