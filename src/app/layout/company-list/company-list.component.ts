import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalCompaniesComponent } from 'src/app/components/modal-companies/modal-companies.component';
import { ModalCompanyService } from 'src/app/services/modal-company.service';
import Swal from 'sweetalert2';
import { UserData } from '../main/main.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
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
    'ruc',
    'nContacto',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private modalServices: ModalCompanyService
  ) {}

  ngOnInit(): void {
    this.getCompany();
  }

  createCompany() {
    const dialogRef = this.dialog.open(ModalCompaniesComponent, { width: '525px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCompany();
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  changeAsideFixed(e: boolean) {
    this.fixedAside = e;
  }

  getCompany() {
    this.modalServices.getCompany().subscribe({
      next: (res) => {
        console.log('COMPANY', res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo cargar la lista de Empresas', 'warning');
      },
    });
  }

  editCompany(row: any) {
    console.log(row);
    this.dialog
      .open(ModalCompaniesComponent, {
        width: '525px',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          this.getCompany();
        }
      });
  }

  deleteCompany(id: number) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar la Empresa?',
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
          text: 'La Empresa se eliminó con exito',
        });

        this.modalServices.deleteCompany(id).subscribe((resp) => {
          this.getCompany();
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
