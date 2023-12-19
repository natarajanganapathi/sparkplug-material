import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMenuDocComponent } from './action-menu-doc.component';

describe('ActionMenuDocComponent', () => {
  let component: ActionMenuDocComponent;
  let fixture: ComponentFixture<ActionMenuDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionMenuDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionMenuDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
