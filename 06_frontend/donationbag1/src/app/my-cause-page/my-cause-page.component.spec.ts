import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCausePageComponent } from './my-cause-page.component';

describe('MyCausePageComponent', () => {
  let component: MyCausePageComponent;
  let fixture: ComponentFixture<MyCausePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCausePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCausePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
