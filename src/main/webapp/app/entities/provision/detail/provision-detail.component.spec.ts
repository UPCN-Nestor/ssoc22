import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProvisionDetailComponent } from './provision-detail.component';

describe('Provision Management Detail Component', () => {
  let comp: ProvisionDetailComponent;
  let fixture: ComponentFixture<ProvisionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvisionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ provision: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ProvisionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProvisionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load provision on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.provision).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
