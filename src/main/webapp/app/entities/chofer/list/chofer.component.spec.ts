import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ChoferService } from '../service/chofer.service';

import { ChoferComponent } from './chofer.component';

describe('Chofer Management Component', () => {
  let comp: ChoferComponent;
  let fixture: ComponentFixture<ChoferComponent>;
  let service: ChoferService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChoferComponent],
    })
      .overrideTemplate(ChoferComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChoferComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ChoferService);

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
    expect(comp.chofers?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
