import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CauseCardComponent } from './cause-card.component';

describe('CauseCardComponent', () => {
  let component: CauseCardComponent;
  let fixture: ComponentFixture<CauseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CauseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CauseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
