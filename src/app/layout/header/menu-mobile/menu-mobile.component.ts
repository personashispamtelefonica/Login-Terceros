import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from '../../aside/aside.component';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent implements OnInit {
  active:boolean = false;
  menuConfig:Menu[] = [];

  subMenuTitle:string = '';
  subMenus:Menu[]=[];
  subMenuActive:boolean = false;


  constructor(
    private menuService: MenuService,

  ) { }

  ngOnInit(): void {
  }


  close(){
    this.menuService.activeMenuMobile$.emit(false);
    console.log("emitido")
  }


  showSubMenu(item:Menu){
    this.subMenuActive = true;
    this.subMenus = item.submenus;
    this.subMenuTitle=item.text;
  }

}
