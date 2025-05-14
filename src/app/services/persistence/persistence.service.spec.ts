import { TestBed } from '@angular/core/testing';
import { PersistenceService } from './persistence.service';

describe('PersistenceService', () => {
  let service: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new item to tracebilityInfo', () => {
    const item = { id: 1, name: 'Item 1' };
    service.savetracebilityInfoData('key1', item);

    const data = service.getTracebilityInfoData();
    expect(data.length).toBe(1);
    expect(data[0]).toEqual({ key: 'key1', value: item });
  });

  it('should update an existing item if id matches', () => {
    const item1 = { id: 1, name: 'Item 1' };
    const item2 = { id: 1, name: 'Item 1 Updated' };

    service.savetracebilityInfoData('key1', item1);
    service.savetracebilityInfoData('key2', item2);

    const data = service.getTracebilityInfoData();
    expect(data.length).toBe(1);
    expect(data[0]).toEqual({ key: 'key2', value: item2 });
  });

  it('should return empty array initially', () => {
    expect(service.getTracebilityInfoData()).toEqual([]);
  });
});
