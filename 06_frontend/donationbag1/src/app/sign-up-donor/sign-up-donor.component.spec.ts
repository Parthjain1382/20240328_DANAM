import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpDonorComponent } from './sign-up-donor.component';

describe('SignUpDonorComponent', () => {
  let component: SignUpDonorComponent;
  let fixture: ComponentFixture<SignUpDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpDonorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
