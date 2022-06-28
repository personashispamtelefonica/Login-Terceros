import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() generalfixedAside = new EventEmitter<Boolean>();

  fixedAside = false;
  sideNavState: boolean = true;
  menuSelected: any = null;
  panelOpenState = true;

  menuList = [
    {
      icon: 'folder_special',
      link: 'nmj',
      name: 'Inicio',
      info: 'Inicio',
      displayed: false,
      subMenuList: [
        {
          icon: 'engineering',
          name: 'Listas',
          link: 'abc',
          info: 'usuarios guardados',
          displayed: false,
        },
        {
          icon: 'search',
          name: 'codigos',
          link: 'xyz',
          info: 'Coóigos guardados',
          displayed: false,
        },
      ],
    },
    {
      icon: 'brightness_7',
      name: 'Mantenimiento',
      link: '',
      info: 'Mantenimiento',
      displayed: false,
      subMenuList: [
        {
          icon: 'business',
          link: 'company',
          name: 'Empresa',
          info: 'Lista empresas',
          displayed: false,
        },
        {
          icon: 'people',
          link: 'usuarios',
          name: 'Colaboradores',
          info: 'Lista de colaboradores',
          displayed: false,
        },
        {
          icon: 'search',
          link: 'abd',
          name: 'Todo',
          info: 'Coóigos guardados',
          displayed: false,
        },
      ],
    },
    {
      icon: 'person',
      name: 'Pase de colaborador',
      link: 'mnp',
      info: 'Retorno a oficina',
      displayed: false,
      subMenuList: [
        {
          icon: 'groups',
          link: 'encuesta',
          name: 'Pase de reunión',
          info: 'Confirmación de encuestas',
          displayed: false,
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
          displayed: false,
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  clickLinkMenu() {
    this.menuList.forEach((item) => {
      item.displayed = false;
    });
  }

  clickToggleMenu(item: any) {
    const final = !item.displayed;
    if (!(this.fixedAside == false && final == false)) {
      this.menuList.map((item) => {
        item.displayed = false;
      });
      item.displayed = final;
    }
    this.toggleAside(true);
  }

  toggleAside(e: boolean) {
    this.fixedAside = e;
    this.generalfixedAside.emit(this.fixedAside);
  }
}
