import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotOrgPasswordComponent } from './forgot-org-password.component';

describe('ForgotOrgPasswordComponent', () => {
  let component: ForgotOrgPasswordComponent;
  let fixture: ComponentFixture<ForgotOrgPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotOrgPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotOrgPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
