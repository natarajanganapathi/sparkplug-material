import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FtcLayout } from './layout';

describe('LayoutComponent', () => {
  let component: FtcLayout;
  let fixture: ComponentFixture<FtcLayout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FtcLayout],
    });
    fixture = TestBed.createComponent(FtcLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});