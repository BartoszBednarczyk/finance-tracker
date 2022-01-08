import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclicTransactionDialogComponent } from './cyclic-transaction-dialog.component';

describe('CyclicTransactionDialogComponent', () => {
  let component: CyclicTransactionDialogComponent;
  let fixture: ComponentFixture<CyclicTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyclicTransactionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclicTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
