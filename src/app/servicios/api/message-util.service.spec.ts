import { TestBed } from '@angular/core/testing';

import { MessageUtil } from './message-util.service';

describe('MessageUtilService', () => {
  let service: MessageUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
