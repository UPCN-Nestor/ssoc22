import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { IndividuoService } from '../service/individuo.service';

import { IndividuoComponent } from './individuo.component';

describe('Individuo Management Component', () => {
  let comp: IndividuoComponent;
  let fixture: ComponentFixture<IndividuoComponent>;
  let service: IndividuoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [IndividuoComponent],
    })
      .overrideTemplate(IndividuoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IndividuoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(IndividuoService);

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
    expect(comp.individuos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
