import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EquipoService } from '../service/equipo.service';

import { EquipoComponent } from './equipo.component';

describe('Equipo Management Component', () => {
  let comp: EquipoComponent;
  let fixture: ComponentFixture<EquipoComponent>;
  let service: EquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EquipoComponent],
    })
      .overrideTemplate(EquipoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EquipoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EquipoService);

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
    expect(comp.equipos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
