import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() generalFixedAside = new EventEmitter<Boolean>();

  fixedAside = true;
  sideNavState:boolean = true;
  menuSelected: any = null;
  panelOpenState = true;

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
          name: 'Lista de pases',
          info: 'Pase de colaboradores',
        },
      ],
    },
  ];

  constructor() {}

  setMenuIndex(index: number) {
    this.menuSelected = index;
    console.log(this.menuSelected);
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;
  }

  toggleAside(e: boolean) {
    this.fixedAside = e;
    this.generalFixedAside.emit(this.fixedAside);
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;
  }
}
