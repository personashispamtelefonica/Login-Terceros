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
  fixedAside: boolean = false;
  sideNavState = false;
  menuConfig!: Menu[];

  menuList = [
    {
      icon: 'home',
      link: '',
      name: 'Inicio',
      info: 'Inicio',
      subMenuList: [
        {
          icon: 'engineering',
          name: 'Listas',
          link: 'abcd',
          info: 'usuarios guardados',
        },
        {
          icon: 'search',
          name: 'codigos',
          link: 'abc',
          info: 'Coóigos guardados',
        },
      ],
    },
    {
      icon: 'brightness_7',
      name: 'Mantenimiento',
      link: '',
      info: 'Mantenimiento',
      subMenuList: [
        {
          icon: 'business',
          link: 'company',
          name: 'Empresa',
          info: 'Lista empresas',
        },
        {
          icon: 'people',
          link: 'usuarios',
          name: 'Colaboradores',
          info: 'Lista de colaboradores',
        },
        {
          icon: 'search',
          link: 'xyz',
          name: 'Todo',
          info: 'Coóigos guardados',
        },
      ],
    },
    {
      icon: 'groups',
      name: 'Encuestas',
      link: '',
      info: 'Encuestas a colaboradores',
      subMenuList: [
        {
          icon: 'person',
          link: 'encuesta',
          name: 'Encuesta de colaboradores',
          info: 'Confirmación de encuestas',
        },
        {
          icon: 'checklist_rtl',
          link: 'pases',
          name: 'lissta de pases',
          info: 'Pase de colaboradores',
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
