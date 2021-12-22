import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SubscripcionService } from '../service/subscripcion.service';

import { SubscripcionComponent } from './subscripcion.component';

describe('Subscripcion Management Component', () => {
  let comp: SubscripcionComponent;
  let fixture: ComponentFixture<SubscripcionComponent>;
  let service: SubscripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubscripcionComponent],
    })
      .overrideTemplate(SubscripcionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubscripcionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SubscripcionService);

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
    expect(comp.subscripcions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
