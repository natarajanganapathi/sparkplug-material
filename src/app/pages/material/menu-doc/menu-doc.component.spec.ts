import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDocComponent } from './menu-doc.component';

describe('ActionMenuDocComponent', () => {
  let component: MenuDocComponent;
  let fixture: ComponentFixture<MenuDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
