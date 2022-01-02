import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthTransactionsComponent } from './month-transactions.component';

describe('MonthTransactionsComponent', () => {
  let component: MonthTransactionsComponent;
  let fixture: ComponentFixture<MonthTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
