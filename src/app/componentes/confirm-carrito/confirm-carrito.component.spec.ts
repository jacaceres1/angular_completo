import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCarritoComponent } from './confirm-carrito.component';

describe('ConfirmCarritoComponent', () => {
  let component: ConfirmCarritoComponent;
  let fixture: ComponentFixture<ConfirmCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCarritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
