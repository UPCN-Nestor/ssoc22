import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProvisionService } from '../service/provision.service';

import { ProvisionComponent } from './provision.component';

describe('Provision Management Component', () => {
  let comp: ProvisionComponent;
  let fixture: ComponentFixture<ProvisionComponent>;
  let service: ProvisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProvisionComponent],
    })
      .overrideTemplate(ProvisionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProvisionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProvisionService);

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
    expect(comp.provisions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
