import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ReglaPrestacionService } from '../service/regla-prestacion.service';

import { ReglaPrestacionComponent } from './regla-prestacion.component';

describe('ReglaPrestacion Management Component', () => {
  let comp: ReglaPrestacionComponent;
  let fixture: ComponentFixture<ReglaPrestacionComponent>;
  let service: ReglaPrestacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReglaPrestacionComponent],
    })
      .overrideTemplate(ReglaPrestacionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReglaPrestacionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ReglaPrestacionService);

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
    expect(comp.reglaPrestacions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
