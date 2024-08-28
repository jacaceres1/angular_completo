import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdenComponent } from './list-orden.component';

describe('ListOrdenComponent', () => {
  let component: ListOrdenComponent;
  let fixture: ComponentFixture<ListOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrdenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
