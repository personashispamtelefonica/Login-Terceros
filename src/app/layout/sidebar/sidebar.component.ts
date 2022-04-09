import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() generalFixeSIde = new EventEmitter<Boolean>()

  fixedSide=false;

  sideNavState:boolean = true;
  menuSelected: any = null;
  panelOpenState = true;
  displayed?: boolean;


  menuList = [
    {
      icon: 'home',
      link: '',
      name: 'Inicio',
      info: 'Inicio',
      displayed:true,
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
      displayed:true,

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
      icon: 'home',
      name: 'Encuestas',
      link: '',
      info: 'Retorno a oficina',
      displayed:false,

      subMenuList: [
        {
          icon: 'groups',
          link: 'encuesta',
          name: 'Pase de reunión',
          info: 'Confirmación de encuestas',
        },
        /* {
          icon: 'person',
          link: 'encuesta',
          name: 'Encuesta de colaboradores',
          info: 'Confirmación de encuestas',
        }, */
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


  clickLinkMenu(){
    this.menuList.forEach(item => {
      item.displayed = false
    });
  }

  setMenuIndex(index: number) {
    this.menuSelected = index;
    console.log(this.menuSelected);
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;
  }

  toggleAside(e: boolean) {
    this.fixedSide = e;
    this.generalFixeSIde.emit(this.fixedSide);
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;
  }
}
