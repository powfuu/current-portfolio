import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  langIsEs(): boolean {
    return localStorage.getItem('lang') === 'es';
  }
}
