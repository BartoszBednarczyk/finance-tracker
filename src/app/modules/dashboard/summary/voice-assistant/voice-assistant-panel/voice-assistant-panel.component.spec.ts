import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceAssistantPanelComponent } from './voice-assistant-panel.component';

describe('VoiceAssistantPanelComponent', () => {
  let component: VoiceAssistantPanelComponent;
  let fixture: ComponentFixture<VoiceAssistantPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceAssistantPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceAssistantPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
