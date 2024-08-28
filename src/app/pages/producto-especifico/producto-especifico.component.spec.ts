import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEspecificoComponent } from './producto-especifico.component';

describe('ProductoEspecificoComponent', () => {
  let component: ProductoEspecificoComponent;
  let fixture: ComponentFixture<ProductoEspecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoEspecificoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
