import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutservicesComponent } from './aboutservices.component';

describe('AboutservicesComponent', () => {
  let component: AboutservicesComponent;
  let fixture: ComponentFixture<AboutservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutservicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
