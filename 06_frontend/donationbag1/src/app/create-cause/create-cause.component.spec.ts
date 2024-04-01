import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCauseComponent } from './create-cause.component';

describe('CreateCauseComponent', () => {
  let component: CreateCauseComponent;
  let fixture: ComponentFixture<CreateCauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCauseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
