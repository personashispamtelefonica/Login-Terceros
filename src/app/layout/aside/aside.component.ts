import { Component, OnInit } from '@angular/core';
export interface Menu{
  code:string,
  text:string,
  order:number,
  icon:string,
  type:string,
  link:string,
  submenus:Menu[]
  enable:boolean,
  module:string,
  displayed?: boolean,
}

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  menuConfig: Menu[]=[];

  fixedAside=true;


  constructor() { }

  ngOnInit(): void {
  }


  clickLinkMenu(){
   /*  this.menuConfig.forEach(item => {
      item.displayed = false;
    }) */
  }

}
