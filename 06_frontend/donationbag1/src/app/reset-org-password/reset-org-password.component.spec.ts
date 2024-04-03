import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetOrgPasswordComponent } from './reset-org-password.component';

describe('ResetOrgPasswordComponent', () => {
  let component: ResetOrgPasswordComponent;
  let fixture: ComponentFixture<ResetOrgPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetOrgPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetOrgPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
