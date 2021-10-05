import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTransactionsItemComponent } from './last-transactions-item.component';

describe('LastTransactionsItemComponent', () => {
  let component: LastTransactionsItemComponent;
  let fixture: ComponentFixture<LastTransactionsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastTransactionsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastTransactionsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
