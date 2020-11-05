import { TestBed } from '@angular/core/testing';

import { RoleProvider } from './role.provider';

describe('RoleService', () => {
  let service: RoleProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
