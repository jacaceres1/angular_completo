import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoValidarComponent } from './pago-validar.component';

describe('PagoValidarComponent', () => {
  let component: PagoValidarComponent;
  let fixture: ComponentFixture<PagoValidarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoValidarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoValidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
