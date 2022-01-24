import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MedicoService } from '../service/medico.service';

import { MedicoComponent } from './medico.component';

describe('Medico Management Component', () => {
  let comp: MedicoComponent;
  let fixture: ComponentFixture<MedicoComponent>;
  let service: MedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MedicoComponent],
    })
      .overrideTemplate(MedicoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MedicoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MedicoService);

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
    expect(comp.medicos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
