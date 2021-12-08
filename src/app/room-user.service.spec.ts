import { TestBed } from '@angular/core/testing';

import { RoomUserService } from './room-user.service';

describe('RoomUserService', () => {
  let service: RoomUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
