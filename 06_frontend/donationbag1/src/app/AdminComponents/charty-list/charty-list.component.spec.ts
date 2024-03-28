import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartyListComponent } from './charty-list.component';

describe('ChartyListComponent', () => {
  let component: ChartyListComponent;
  let fixture: ComponentFixture<ChartyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
