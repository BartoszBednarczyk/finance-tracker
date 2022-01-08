import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeChartControlComponent } from './change-chart-control.component';

describe('ChangeChartControlComponent', () => {
  let component: ChangeChartControlComponent;
  let fixture: ComponentFixture<ChangeChartControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeChartControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeChartControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
