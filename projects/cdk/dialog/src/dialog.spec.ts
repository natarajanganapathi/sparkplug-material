import { TestBed } from '@angular/core/testing';

import { FtcDialog } from './dialog';

describe('FtcDialog', () => {
  let service: FtcDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtcDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
