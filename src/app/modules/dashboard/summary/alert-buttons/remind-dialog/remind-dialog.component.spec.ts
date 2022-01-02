import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindDialogComponent } from './remind-dialog.component';

describe('RemindDialogComponent', () => {
  let component: RemindDialogComponent;
  let fixture: ComponentFixture<RemindDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemindDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
