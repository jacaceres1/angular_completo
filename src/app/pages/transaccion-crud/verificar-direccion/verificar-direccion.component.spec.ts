import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarDireccionComponent } from './verificar-direccion.component';

describe('VerificarDireccionComponent', () => {
  let component: VerificarDireccionComponent;
  let fixture: ComponentFixture<VerificarDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificarDireccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
