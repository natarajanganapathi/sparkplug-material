import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDocComponent } from './layout-doc.component';

describe('LayoutDocComponent', () => {
  let component: LayoutDocComponent;
  let fixture: ComponentFixture<LayoutDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
