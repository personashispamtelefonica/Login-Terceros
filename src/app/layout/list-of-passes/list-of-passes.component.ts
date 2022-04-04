import { Component, Inject, OnInit } from '@angular/core';
import { ListOfPases } from 'src/app/interfaces/list-pases';
import { ListOfPassesService } from 'src/app/services/list-of-passes.service';
import Swal from 'sweetalert2';

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
    this.cargando = true;
    this.listPassesService.getListOfPasses()
        .subscribe((res) => {
          // console.log('PASES', res)
          this.listPasses = res;
          this.cargando = false;
    });
  }

  deleteListPasses(list: ListOfPases) {
    Swal.fire({
      title: '¿Borrar pase?',
      text: `Esta a punto de eliminar a ${list.date}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.value) {
        this.listPassesService.deleteListPasses(list.id)
        .subscribe((resp) => {
          this.getListOfPasses();
          Swal.fire(
            'Pase eliminado',
            `${list.date} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }

  cambiarPagina(valor: number) {
    this.pagActual += valor;
    if (this.pagActual < 0) {
      console.log(this.pagActual);

      this.pagActual = 0;
    } else {
      this.pagActual -= valor;
      console.log(this.pagActual);
    }
    this.getListOfPasses();
  }
}


