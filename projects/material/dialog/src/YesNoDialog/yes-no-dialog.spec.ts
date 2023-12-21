import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtcYesNoDialog } from './yes-no-dialog';

describe('FtcYesNoDialogComponent', () => {
  let component: FtcYesNoDialog;
  let fixture: ComponentFixture<FtcYesNoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtcYesNoDialog]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FtcYesNoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
