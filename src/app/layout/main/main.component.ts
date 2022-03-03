import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  // loading:boolean = true; //OJO REVISAR
  loading:boolean = false;
  // fixedAside:boolean = false; //REVISAR
  fixedAside:boolean = false ;

  constructor() {}

  ngOnInit(): void {}


  changeAsideFixed(e:boolean){
    this.fixedAside = e;
  }

}
