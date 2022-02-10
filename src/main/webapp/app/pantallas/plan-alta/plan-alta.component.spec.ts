import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAltaComponent } from './plan-alta.component';

describe('PlanAltaComponent', () => {
  let component: PlanAltaComponent;
  let fixture: ComponentFixture<PlanAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanAltaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
