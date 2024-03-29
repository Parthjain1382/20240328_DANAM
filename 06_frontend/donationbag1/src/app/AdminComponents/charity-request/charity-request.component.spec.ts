import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityRequestComponent } from './charity-request.component';

describe('CharityRequestComponent', () => {
  let component: CharityRequestComponent;
  let fixture: ComponentFixture<CharityRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharityRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharityRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
