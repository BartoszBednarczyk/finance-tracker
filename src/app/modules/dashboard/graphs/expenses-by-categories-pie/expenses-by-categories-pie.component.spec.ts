import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesByCategoriesPieComponent } from './expenses-by-categories-pie.component';

describe('ExpensesByCategoriesPieComponent', () => {
  let component: ExpensesByCategoriesPieComponent;
  let fixture: ComponentFixture<ExpensesByCategoriesPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesByCategoriesPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesByCategoriesPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
