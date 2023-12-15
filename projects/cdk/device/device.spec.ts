import { TestBed } from '@angular/core/testing';

import { FtcDevice } from './device';

describe('Device', () => {
  let service: FtcDevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtcDevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
