import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AdhesionService } from '../service/adhesion.service';

import { AdhesionComponent } from './adhesion.component';

describe('Adhesion Management Component', () => {
  let comp: AdhesionComponent;
  let fixture: ComponentFixture<AdhesionComponent>;
  let service: AdhesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdhesionComponent],
    })
      .overrideTemplate(AdhesionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AdhesionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AdhesionService);

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
    expect(comp.adhesions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
