import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbadorComponent } from './probador.component';

describe('ProbadorComponent', () => {
  let component: ProbadorComponent;
  let fixture: ComponentFixture<ProbadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
