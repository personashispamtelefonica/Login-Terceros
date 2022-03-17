import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  fixedAside: boolean = true;
  loading: boolean = true;
  message: string = 'Preparando contenido...';

  constructor() {}

  ngOnInit(): void {}
}
