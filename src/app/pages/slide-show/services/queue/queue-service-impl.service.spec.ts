import { TestBed, inject } from '@angular/core/testing';

import { QueueServiceServiceImpl } from './queue-service-impl.service';

describe('QueueServiceServiceImpl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueueServiceServiceImpl]
    });
  });

  it('should be created', inject([QueueServiceServiceImpl], (service: QueueServiceServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
