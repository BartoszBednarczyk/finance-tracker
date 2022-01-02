import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertButtonsComponent } from './alert-buttons.component';

describe('AlertButtonsComponent', () => {
  let component: AlertButtonsComponent;
  let fixture: ComponentFixture<AlertButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
