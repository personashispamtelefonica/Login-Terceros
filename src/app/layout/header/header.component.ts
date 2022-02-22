import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nameini!:string;


  constructor() { }

  ngOnInit(): void {
  }


  openMobileMenu(){
    //this.menu.activeMenuMobile$.emit(true);
  }

}
