import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtcTable } from './table';

describe('GridComponent', () => {
  let component: FtcTable<object>;
  let fixture: ComponentFixture<FtcTable<object>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtcTable<object>]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FtcTable<object>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
