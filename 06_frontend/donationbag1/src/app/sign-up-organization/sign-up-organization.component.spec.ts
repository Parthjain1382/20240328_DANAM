import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOrganizationComponent } from './sign-up-organization.component';

describe('SignUpOrganizationComponent', () => {
  let component: SignUpOrganizationComponent;
  let fixture: ComponentFixture<SignUpOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpOrganizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
