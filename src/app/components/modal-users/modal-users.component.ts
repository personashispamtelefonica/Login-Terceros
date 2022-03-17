import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalUserService } from 'src/app/services/modal-user.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrls: ['./modal-users.component.scss'],
})
export class ModalUsersComponent implements OnInit {
  usuariosForm!: FormGroup;
  actionBtn: string = 'Guardar';

  constructor(
    private fb: FormBuilder,
    private modalServices: ModalUserService,
    private dialogRef: MatDialogRef<ModalUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.usuariosForm = this.fb.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      cargo: ['', Validators.required],
    });

    console.log('Dataaa', this.editData);

    if (this.editData) {
      this.actionBtn = 'Actualizar';
      this.usuariosForm.controls['nombre'].setValue(this.editData.nombre);
      this.usuariosForm.controls['genero'].setValue(this.editData.genero);
      this.usuariosForm.controls['cargo'].setValue(this.editData.cargo);
    }
  }

  close(succes?: boolean) {
    this.dialogRef.close(succes);
  }

  agregarUsuario() {
    console.log(this.usuariosForm.value);
    if (!this.editData) {
      if (this.usuariosForm.valid) {
        this.modalServices.crearUsuario(this.usuariosForm.value).subscribe({
          next: (res) => {
            Swal.fire(
              'Usuario agregado!',
              'Usuario agregado con éxito',
              'success'
            );
            this.usuariosForm.reset();
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
      .updateUsers(this.usuariosForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          Swal.fire(
            'Actualizar usuario!',
            'Usuario actualizado con éxito',
            'success'
          );

          this.usuariosForm.reset();
          this.dialogRef.close('update');
        }, error:()=>{
          Swal.fire(
            'ERROR',
            'No se pudo actulizar el usuario',
            'warning'
          );
        }
      });
  }
}
