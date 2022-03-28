import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalUsersComponent } from 'src/app/components/modal-users/modal-users.component';
import { ModalUserService } from 'src/app/services/modal-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss'],
})
export class UsuariosListComponent implements OnInit {
  companyValue = new FormControl();

  totalUsuarios: number = 13;
  loading: boolean = false;
  fixedAside: boolean = false;
  loadingItem = false;
  table_settings = {
    page: 1,
    size: 10,
    pages: 0,
  };

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
    this.cargarUsuarios();
    this.companyValue.valueChanges.subscribe(company=>{
      console.log('COMPAN',company)
      console.log('DDAT',this.dataSource)

    this.dataSource.filter = company.trim().toLowerCase();


    })
  }



  createUser() {
    const dialogRef = this.dialog.open(ModalUsersComponent, { width: '525px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarUsuarios();
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  changeAsideFixed(e: boolean) {
    this.fixedAside = e;
  }

  cargarUsuarios() {
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
          this.cargarUsuarios();
        }
      });
  }

  deleteUsers(id: number) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `¿Estas seguro que deseas eliminar el Usuario?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.value) {
        console.log('Eliminandooo', result);

        this.modalServices.deleteUsers(id).subscribe((resp) => {
          this.cargarUsuarios();
          Swal.fire({
            title: 'Usuario eliminado',
            text: 'El usuario se eliminó con exito',
            icon: 'success',
          });
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('AAAA',filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
