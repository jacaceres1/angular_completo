import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoAddComponent } from './carrito-add.component';

describe('CarritoAddComponent', () => {
  let component: CarritoAddComponent;
  let fixture: ComponentFixture<CarritoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarritoAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
