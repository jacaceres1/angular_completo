import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificaTransComponent } from './verifica-trans.component';

describe('VerificaTransComponent', () => {
  let component: VerificaTransComponent;
  let fixture: ComponentFixture<VerificaTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificaTransComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificaTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
