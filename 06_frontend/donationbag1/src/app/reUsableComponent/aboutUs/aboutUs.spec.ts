import { ComponentFixture, TestBed } from '@angular/core/testing';

import { aboutUsComponent } from './aboutUs.component';

describe('VisionComponentComponent', () => {
  let component: aboutUsComponent;
  let fixture: ComponentFixture<aboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [aboutUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(aboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
