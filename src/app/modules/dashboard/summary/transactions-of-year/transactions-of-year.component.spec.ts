import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsOfYearComponent } from './transactions-of-year.component';

describe('TransactionsOfYearComponent', () => {
  let component: TransactionsOfYearComponent;
  let fixture: ComponentFixture<TransactionsOfYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsOfYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsOfYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
