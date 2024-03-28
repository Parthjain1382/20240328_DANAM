import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewOrphanageComponent } from './add-new-orphanage.component';

describe('AddNewOrphanageComponent', () => {
  let component: AddNewOrphanageComponent;
  let fixture: ComponentFixture<AddNewOrphanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewOrphanageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewOrphanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
