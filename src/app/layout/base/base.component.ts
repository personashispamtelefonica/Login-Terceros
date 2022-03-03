import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/views/auth/services/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  hasphoto = false;
  fullName: string = '';
  userAbbreviation = '';  //input user-section
  fixedAside:boolean = true;
  sideNavState = false;


  menuList = [
    {
      icon: 'home',
      name: 'Inicio',
      info: 'Inicio',
      subMenuList: [
        { icon: 'engineering', name: 'Listas', info: 'usuarios guardados' },
        { icon: 'search', name: 'codigos', info: 'Coóigos guardados' },
      ],
    },
    {
      icon: 'brightness_7',
      name: 'Informes',
      info: 'Inicio',
      subMenuList: [
        { icon: 'spatial_tracking', name: 'Lista cod. QR', info: 'usuarios guardados' },
        { icon: 'search', name: 'codigos', info: 'Coóigos guardados' },
      ],
    },
    {
      icon: 'connect_without_contact',
      name: 'Configuración',
      info: 'Creación de usuarios',
      subMenuList: [{ icon: 'person', name: 'Usuarios nuevos', info: 'Usuarios nuevos' }],
    },
  ];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeUser();
  }

  initializeUser(){
    this.fullName = this.authService.getUsername();
    if (this.fullName) {
      const fullNameToArray = this.fullName.split(' ').map((item: string) => {
        return item.substring(0, 1).toUpperCase();
      });
      this.userAbbreviation = fullNameToArray.join('');
    }
  }
  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;
  }


  logout() {
    this.authService.logout();
  }
}
