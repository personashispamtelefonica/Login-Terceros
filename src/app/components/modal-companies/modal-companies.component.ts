import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalUserService } from 'src/app/services/modal-user.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCompanyService } from 'src/app/services/modal-company.service';

@Component({
  selector: 'app-modal-companies',
  templateUrl: './modal-companies.component.html',
  styleUrls: ['./modal-companies.component.scss'],
})
export class ModalCompaniesComponent implements OnInit {
  companyForm!: FormGroup;
  actionBtn: string = 'Guardar';

  constructor(
    private fb: FormBuilder,
    private modalServices: ModalCompanyService,
    private dialogRef: MatDialogRef<ModalCompaniesComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: {id:number, nombre:string,correo:string,ruc:number, nContacto:string},
  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['company@indracompany.com', [Validators.required, Validators.email]],
      ruc:    ['', Validators.required],
      nContacto: ['', Validators.required],
    });

    console.log('Data COMPANY', this.editData);

    if (this.editData) {
      this.actionBtn = 'Actualizar';
      this.companyForm.controls['nombre'].setValue(this.editData.nombre);
      this.companyForm.controls['correo'].setValue(this.editData.correo);
      this.companyForm.controls['ruc'].setValue(this.editData.ruc);
      this.companyForm.controls['nContacto'].setValue(this.editData.nContacto);
    }
  }



  addCompany() {
    console.log('AAAA',this.companyForm.value);
    if (!this.editData) {
      if (this.companyForm.valid) {
        this.modalServices.addCompany(this.companyForm.value).subscribe({
          next: (res) => {
            Swal.fire(
              'Empresa agregado!',
              'Empresa agregado con éxito',
              'success'
            );
            this.companyForm.reset();
            this.close(true);
          },
          error: () => {
            Swal.fire('Error!', 'Cuidado!', 'warning');
          },
        });
      }
    } else {
      this.updateUsers();
    }
  }

  updateUsers() {
    this.modalServices
      .updateCompany(this.companyForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          Swal.fire(
            'Actualizar Empresa!',
            'Empresa actualizado con éxito',
            'success'
          );

          this.companyForm.reset();
          this.dialogRef.close('update');
        }, error:()=>{
          Swal.fire(
            'ERROR',
            'No se pudo actulizar la Empresa',
            'warning'
          );
        }
      });
  }


  close(succes?: boolean) {
    this.dialogRef.close(succes);
  }
}
