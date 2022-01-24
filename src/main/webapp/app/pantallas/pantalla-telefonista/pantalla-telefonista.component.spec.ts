import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaTelefonistaComponent } from './pantalla-telefonista.component';

describe('PantallaTelefonistaComponent', () => {
  let component: PantallaTelefonistaComponent;
  let fixture: ComponentFixture<PantallaTelefonistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantallaTelefonistaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaTelefonistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
