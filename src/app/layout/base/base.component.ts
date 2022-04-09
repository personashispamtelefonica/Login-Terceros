import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/views/auth/services/auth.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  hasphoto = false;
  fullName: string = '';
  loading:boolean = true;
  userAbbreviation = ''; //input user-section
  fixedAside:boolean = false;
  menuError:boolean = false;
  message:string = "Preparando contenido...";


  sideNavState = false;


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeUser();
  }

  changeSideFixed(event:boolean){
    this.fixedAside = event;
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

 /*  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;
  } */



  logout() {
    this.authService.logout();
  }
}
