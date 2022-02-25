import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  activeMenuMobile$ = new EventEmitter<boolean>();


  constructor() { }
}
