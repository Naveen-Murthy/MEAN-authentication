import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  /**
   * @desc To get an item from localstorage based on passed key
   * @param   key
   * @returns any
   */
  getItemFromLocalStorage(key: string): any {
    try {
      return localStorage.getItem(key);
    } catch (Error) {
      return null;
    }
  }

  setItemToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  removeItemFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * @desc To get an item from localstorage based on passed key
   * @param   key
   * @returns any
   */
   getItemFromSessionStorage(key: string): any {
    try {
      return sessionStorage.getItem(key);
    } catch (Error) {
      return null;
    }
  }

  setItemToSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  removeItemFromSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }
}
