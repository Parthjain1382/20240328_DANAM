import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponentComponent } from './table-component.component';

describe('TableComponentComponent', () => {
  let component: TableComponentComponent;
  let fixture: ComponentFixture<TableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
