import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { InsumoService } from '../service/insumo.service';

import { InsumoComponent } from './insumo.component';

describe('Insumo Management Component', () => {
  let comp: InsumoComponent;
  let fixture: ComponentFixture<InsumoComponent>;
  let service: InsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [InsumoComponent],
    })
      .overrideTemplate(InsumoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InsumoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(InsumoService);

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
    expect(comp.insumos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
