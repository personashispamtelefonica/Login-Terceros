import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalUserService } from 'src/app/services/modal-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrls: ['./modal-users.component.scss'],
})
export class ModalUsersComponent implements OnInit {
  // usuariosForm:FormGroup = new FormGroup({});

  usuariosForm = this.fb.group({
    nombre: ['Yovani', Validators.required],
    genero: ['Masculino', Validators.required],
    cargo: ['Desarrollador', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<ModalUsersComponent>,
    private fb: FormBuilder,
    private modalServices: ModalUserService
  )
  {}

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  save() {}

  addUser() {
    console.log(this.usuariosForm.value);

    if (this.usuariosForm.valid) {
      this.modalServices.crearUsuario(this.usuariosForm.value)
      .subscribe({
        next: (res) => {
          Swal.fire(
            'Usuario agregado!',
            'Usuario agregado con éxito',
            'success'
          );
          this.usuariosForm.reset();
          this.dialogRef.close();
        },
        error: () => {
          Swal.fire(
            'Error!',
            'Cuidado!',
            'warning'
          );
        },
      });
    }
  }
}
