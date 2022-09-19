import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public set<T>(key: string, value: T): void {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  public get<T>(key: string): T {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
