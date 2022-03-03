import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

export const MENU_STORAGE_NAME = 'menstrc';

export interface Menu {
  code: string;
  text: string;
  order: number;
  icon: string;
  type: string;
  link: string;
  submenus: Menu[];
  enable: boolean;
  module: string;
  displayed?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  activeMenuMobile$ = new EventEmitter<boolean>();

  constructor(private http:HttpClient) {}

  // ACTUALIZA EL MENÚ EN EL LOCAL STORAGE DESDE UN API
  async updateMenu(): Promise<boolean> {
    // CONSULTA API de menu y actualiza el storage
    const urlMenu =  "https://aks-hispam-dev.eastus.cloudapp.azure.com/third/v1/api/login"
    return this.http
      //.get(API_GET_MENU)
      .get(urlMenu)
      .toPromise()
//      .then((resp: Menu[]) => {
      .then((resp: any) => {
        const menu = resp.map((m:any) => {
          return { ...m, submenus: m.submenus.sort(this.compare) };
        });
        console.log('--MENU UPDATED FROM API--');
        this.setSessionItem(MENU_STORAGE_NAME, menu);

        return Promise.resolve(true);
      });
    }

    private compare(a:Menu, b:Menu) {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
  }

    setSessionItem(name: string, item: any) {
      const data = JSON.stringify(item)
      //const encrypted = this.encryptData(data);
      sessionStorage.setItem(name, data);
      return true;
    }


  // Función de configuración del menú de acuerdo al token. Se invoca en aside y header
  setMenu(): Promise<boolean> {
    // Validar si se tiene un menú guardado
    const menu_local_version = this.getSessionItem(MENU_STORAGE_NAME);
    if (menu_local_version.code == true) {
      return Promise.resolve(true);
    } else {
      // No tiene menú guardado: Actualizarlo
      return this.updateMenu();
    }
  }

  getMenu(): Menu[] {
    //    const menu = this.getSessionItem(MENU_STORAGE_NAME);
    const menu = this.getSessionItem(MENU_STORAGE_NAME);
    if (menu.code == true) return menu.object;
    else return [];
  }

  getSessionItem(name: string): { code: boolean; object?: any } {
    try {
      const item = localStorage.getItem(name);
      const object = JSON.parse(item!);
      if (!!object) {
        return { code: true, object: object };
      } else {
        return { code: false };
      }
    } catch (error) {
      return { code: false };
    }
  }
}
