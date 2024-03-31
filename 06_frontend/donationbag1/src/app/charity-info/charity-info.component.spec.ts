import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityInfoComponent } from './charity-info.component';

describe('CharityInfoComponent', () => {
  let component: CharityInfoComponent;
  let fixture: ComponentFixture<CharityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharityInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
