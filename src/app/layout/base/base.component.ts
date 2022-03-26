import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/views/auth/services/auth.service';
export interface Menu {
  icon: string;
  name: string;
  info: string;
  subMenuList: Menu[];
  displayed?: boolean;
}

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  hasphoto = false;
  fullName: string = '';
  userAbbreviation = ''; //input user-section
  fixedAside: boolean = true;
  sideNavState = false;
  menuConfig!: Menu[];

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
      name: 'Mantenimiento',
      info: 'Inicio',
      subMenuList: [
        {
          icon: 'business',
          link: 'company',
          name: 'Colaboradores',
          info: 'Lista empresas',
        },
        {
          icon: 'people',
          link: 'usuarios',
          name: 'Usuarios',
          info: 'Lista de Usuarios',
        },
        { icon: 'search', name: 'codigos', info: 'Coóigos guardados' },
      ],
    },
    {
      icon: 'groups',
      name: 'Encuestas',
      info: 'Creación de usuarios',
      subMenuList: [
        {
          icon: 'person',
          link: 'encuesta',
          name: 'Encuesta de colaboradores',
          info: 'Confirmación de encuestas',
        },
      ],
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeUser();
  }

  clickLinkMenu() {
    this.menuConfig.forEach((item) => {
      item.displayed = false;
    });
  }

  initializeUser() {
    this.fullName = this.authService.getUsername();
    if (this.fullName) {
      const fullNameToArray = this.fullName.split(' ').map((item: string) => {
        return item.substring(0, 1).toUpperCase();
      });
      this.userAbbreviation = fullNameToArray.join('');
    }
  }
  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;
  }

  logout() {
    this.authService.logout();
  }
}
