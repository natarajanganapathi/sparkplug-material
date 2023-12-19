import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDocComponent } from './popup-doc.component';

describe('PopupDocComponent', () => {
  let component: PopupDocComponent;
  let fixture: ComponentFixture<PopupDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
