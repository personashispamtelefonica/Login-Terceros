import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalUsersComponent } from 'src/app/components/modal-users/modal-users.component';
import { ModalUserService } from 'src/app/services/modal-user.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  displayedColumns: string[] = ['id', 'nombre', 'genero', 'cargo', 'action'];
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
        console.log('ABC', res);
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
    this.dialog.open(ModalUsersComponent, {
      width: '525px',
      data: row,
    }).afterClosed().subscribe(val=>{
      if (val == 'update') {
        this.obtenerUsuarios()
      }
    })
  }

  deleteUsers(id:number){
    this.modalServices.deleteUsers(id).subscribe({
      next:(res)=>{
        Swal.fire('Cuidado', 'Usuario eliminado con éxito', 'success');
        this.obtenerUsuarios();
      }, error:()=>{
        Swal.fire('ERROR', 'No se pudo eliminar el usuario', 'warning');

      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
