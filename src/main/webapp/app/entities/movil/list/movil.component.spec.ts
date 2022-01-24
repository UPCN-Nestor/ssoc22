import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MovilService } from '../service/movil.service';

import { MovilComponent } from './movil.component';

describe('Movil Management Component', () => {
  let comp: MovilComponent;
  let fixture: ComponentFixture<MovilComponent>;
  let service: MovilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MovilComponent],
    })
      .overrideTemplate(MovilComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MovilComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MovilService);

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
    expect(comp.movils?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
