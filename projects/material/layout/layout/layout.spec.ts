import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpcLayout } from './layout';

describe('ButtonComponent', () => {
  let component: SpcLayout;
  let fixture: ComponentFixture<SpcLayout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpcLayout],
    });
    fixture = TestBed.createComponent(SpcLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});