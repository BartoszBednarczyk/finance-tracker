import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesIncomesBarComponent } from './expenses-incomes-bar.component';

describe('ExpensesIncomesBarComponent', () => {
  let component: ExpensesIncomesBarComponent;
  let fixture: ComponentFixture<ExpensesIncomesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesIncomesBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesIncomesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
