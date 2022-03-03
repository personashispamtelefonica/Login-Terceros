import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  //public menu = [];


  menu: any[] = [
    {
      titulo: 'Usuarios Registrados',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Lista', url: 'lista' },
          { titulo: 'Usuarios con dosís', url: 'dosis' },
          { titulo: 'Usuarios con QR', url: 'qr' },
          { titulo: 'buscar QR', url: 'buscar' },
      ]
    },
  ];

  cargarMenu() {
    //this.menu = JSON.parse(localStorage.getItem('menu')) || [];
    this.menu =  [
      {
        titulo: 'Usuarios con QR',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
          { titulo: 'Lista', url: 'lista' },
          { titulo: 'Usuarios con dosís', url: 'dosis' },
          { titulo: 'Usuarios con QR', url: 'qr' },
          { titulo: 'buscar QR', url: 'buscar' },
        ]
      },
    ];

  }


}
