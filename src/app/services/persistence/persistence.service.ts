import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  private tracebilityInfo = new BehaviorSubject<any[]>([]);

  constructor() {}

  public savetracebilityInfoData(key: string, value: any): void {
    const data = [...this.tracebilityInfo.value];
    const existingIndex = data.findIndex((item) => item.value?.id === value.id);

    if (existingIndex !== -1) {
      data[existingIndex] = { key, value };
    } else {
      data.push({ key, value });
    }

    this.tracebilityInfo.next(data);
  }

  public getTracebilityInfoData(): any[] {
    return this.tracebilityInfo.value;
  }
}
