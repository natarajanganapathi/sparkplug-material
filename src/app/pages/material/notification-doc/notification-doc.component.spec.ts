import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDocComponent } from './notification-doc.component';

describe('NotificationDocComponent', () => {
  let component: NotificationDocComponent;
  let fixture: ComponentFixture<NotificationDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
