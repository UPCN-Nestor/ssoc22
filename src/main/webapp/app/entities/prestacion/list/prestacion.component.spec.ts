import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PrestacionService } from '../service/prestacion.service';

import { PrestacionComponent } from './prestacion.component';

describe('Prestacion Management Component', () => {
  let comp: PrestacionComponent;
  let fixture: ComponentFixture<PrestacionComponent>;
  let service: PrestacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PrestacionComponent],
    })
      .overrideTemplate(PrestacionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PrestacionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PrestacionService);

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
    expect(comp.prestacions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
