import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorProfilePageComponent } from './donor-profile-page.component';

describe('DonorProfilePageComponent', () => {
  let component: DonorProfilePageComponent;
  let fixture: ComponentFixture<DonorProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorProfilePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonorProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
