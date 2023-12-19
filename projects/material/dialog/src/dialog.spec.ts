import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtcDialog } from './dialog';

describe('DialogComponent', () => {
  let component: FtcDialog;
  let fixture: ComponentFixture<FtcDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtcDialog]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FtcDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
