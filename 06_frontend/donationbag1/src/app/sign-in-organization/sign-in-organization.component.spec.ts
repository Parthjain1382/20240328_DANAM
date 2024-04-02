import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInOrganizationComponent } from './sign-in-organization.component';

describe('SignInOrganizationComponent', () => {
  let component: SignInOrganizationComponent;
  let fixture: ComponentFixture<SignInOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInOrganizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
