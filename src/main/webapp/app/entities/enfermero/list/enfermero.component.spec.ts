import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EnfermeroService } from '../service/enfermero.service';

import { EnfermeroComponent } from './enfermero.component';

describe('Enfermero Management Component', () => {
  let comp: EnfermeroComponent;
  let fixture: ComponentFixture<EnfermeroComponent>;
  let service: EnfermeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EnfermeroComponent],
    })
      .overrideTemplate(EnfermeroComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EnfermeroComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EnfermeroService);

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
    expect(comp.enfermeros?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
