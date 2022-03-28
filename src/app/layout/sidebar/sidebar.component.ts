import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() generalFixedAside = new EventEmitter<Boolean>();
  fixedAside = true;

  sideNavState = false;
  menuSelected: any = null;

  panelOpenState = true;

  menuList = [];

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
}
