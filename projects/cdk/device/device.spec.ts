import { TestBed } from '@angular/core/testing';

import { CdkDevice } from './device';

describe('Device', () => {
  let service: CdkDevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdkDevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
