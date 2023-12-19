import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocComponent } from './dialog-doc.component';

describe('PopupDocComponent', () => {
  let component: DialogDocComponent;
  let fixture: ComponentFixture<DialogDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
