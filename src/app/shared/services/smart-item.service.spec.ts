import { TestBed } from '@angular/core/testing';

import { SmartItemService } from './smart-item.service';

describe('SmartItemService', () => {
  let service: SmartItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
