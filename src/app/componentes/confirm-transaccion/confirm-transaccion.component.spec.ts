import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTransaccionComponent } from './confirm-transaccion.component';

describe('ConfirmTransaccionComponent', () => {
  let component: ConfirmTransaccionComponent;
  let fixture: ComponentFixture<ConfirmTransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTransaccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
