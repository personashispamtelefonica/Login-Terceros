import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalUsersComponent } from 'src/app/components/modal-users/modal-users.component';
import { ModalUserService } from 'src/app/services/modal-user.service';
import Swal from 'sweetalert2';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  loading: boolean = false;
  fixedAside: boolean = false;

  displayedColumns: string[] = ['id','nombre', 'genero', 'cargo', 'opcion'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private dialog: MatDialog,
    private modalServices: ModalUserService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalUsersComponent, { width: '40%' });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changeAsideFixed(e: boolean) {
    this.fixedAside = e;
  }

  obtenerUsuarios() {
    this.modalServices.obtenerUsuario().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo cargar los Usuarios', 'warning');
      },
    });
  }
}
