import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarasolComponent } from './carasol.component';

describe('CarasolComponent', () => {
  let component: CarasolComponent;
  let fixture: ComponentFixture<CarasolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarasolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarasolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
