import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTransComponent } from './list-trans.component';

describe('ListTransComponent', () => {
  let component: ListTransComponent;
  let fixture: ComponentFixture<ListTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTransComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
