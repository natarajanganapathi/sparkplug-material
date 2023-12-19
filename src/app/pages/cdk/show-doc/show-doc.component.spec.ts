import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDocComponent } from './show-doc.component';

describe('ShowDocComponent', () => {
  let component: ShowDocComponent;
  let fixture: ComponentFixture<ShowDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
