import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ItemNomencladorService } from '../service/item-nomenclador.service';

import { ItemNomencladorComponent } from './item-nomenclador.component';

describe('ItemNomenclador Management Component', () => {
  let comp: ItemNomencladorComponent;
  let fixture: ComponentFixture<ItemNomencladorComponent>;
  let service: ItemNomencladorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ItemNomencladorComponent],
    })
      .overrideTemplate(ItemNomencladorComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItemNomencladorComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ItemNomencladorService);

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
    expect(comp.itemNomencladors?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
