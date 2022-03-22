import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalUsersComponent } from 'src/app/components/modal-users/modal-users.component';
import { ModalUserService } from 'src/app/services/modal-user.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface UserData {
  id: number;
  nombre: string;
  genero: string;
  pais: string;
  cargo: string;
  empresa: string;
  action: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  usuariosForm=10;
  loading: boolean = false;
  fixedAside: boolean = false;
  loadingItem = false;
  table_settings = {
    page: 1,
    size: 10,
    pages: 0,
  };

  data: UserData[] = [];

  displayedColumns: string[] = [
    'id',
    'nombre',
    'correo',
    'genero',
    'pais',
    'cargo',
    'empresa',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private modalServices: ModalUserService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  createUser() {
    const dialogRef = this.dialog.open(ModalUsersComponent, { width: '525px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerUsuarios();
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  changeAsideFixed(e: boolean) {
    this.fixedAside = e;
  }

  obtenerUsuarios() {
    this.modalServices.obtenerUsuario().subscribe({
      next: (res) => {
        console.log('USERS', res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo cargar los Usuarios', 'warning');
      },
    });
  }

  editUsers(row: any) {
    console.log(row);
    this.dialog
      .open(ModalUsersComponent, {
        width: '525px',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          this.obtenerUsuarios();
        }
      });
  }

  deleteUsers(id: number) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar el usuario?',
      text: 'Ya no podrás revetir estos cambios',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.value) {
        console.log('Eliminandooo', result);

        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'El usuario se eliminó con exito',
        });

        this.modalServices.deleteUsers(id).subscribe((resp) => {
          this.obtenerUsuarios();
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
