import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DespachoService } from '../service/despacho.service';

import { DespachoComponent } from './despacho.component';

describe('Despacho Management Component', () => {
  let comp: DespachoComponent;
  let fixture: ComponentFixture<DespachoComponent>;
  let service: DespachoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DespachoComponent],
    })
      .overrideTemplate(DespachoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DespachoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DespachoService);

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
    expect(comp.despachos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
