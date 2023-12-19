import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideDocComponent } from './hide-doc.component';

describe('HideDocComponent', () => {
  let component: HideDocComponent;
  let fixture: ComponentFixture<HideDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HideDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HideDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
