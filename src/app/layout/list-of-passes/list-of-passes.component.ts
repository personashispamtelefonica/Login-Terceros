import { Component, Inject, OnInit } from '@angular/core';
import { ListOfPases } from 'src/app/interfaces/list-pases';
import { ListOfPassesService } from 'src/app/services/list-of-passes.service';

@Component({
  selector: 'app-list-of-passes',
  templateUrl: './list-of-passes.component.html',
  styleUrls: ['./list-of-passes.component.scss'],
})
export class ListOfPassesComponent implements OnInit {
  public cargando: boolean = true;
  listPasses: ListOfPases[] = [];
  pagActual: number = 0;

  constructor(private listPassesService: ListOfPassesService) {}

  ngOnInit(): void {
    this.getListOfPasses();
  }

  getListOfPasses() {
    this.cargando = true
    this.listPassesService.getListOfPasses()
        .subscribe(
          (res) =>{
            // console.log('PASES', res)
            (this.listPasses = res);
            this.cargando =false
          }
        )
  }

  eliminarPase() {}

  cambiarPagina(valor: number) {
    this.pagActual += valor;
    if (this.pagActual < 0) {
      console.log(this.pagActual);

      this.pagActual = 0;
    } else {
      this.pagActual -= valor;
      console.log(this.pagActual);
    }
    this.getListOfPasses()
  }
}
