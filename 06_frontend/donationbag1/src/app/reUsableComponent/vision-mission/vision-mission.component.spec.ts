import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionMissionComponent } from './vision-mission.component';

describe('VisionMissionComponent', () => {
  let component: VisionMissionComponent;
  let fixture: ComponentFixture<VisionMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionMissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisionMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
