import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public myLoginForm: FormGroup = this.fb.group({
    username: [localStorage.getItem('username') || 'gherson.perez@telefonica.com', [Validators.required, Validators.email]],
    password: ['hola', [Validators.required, Validators.minLength(4)]],
    remember: [false],
  });

  constructor(
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService
  ) {}

  ngOnInit(): void {}

  campoNoValido(campo: string): boolean {
    if (
      this.myLoginForm.get(campo)?.invalid &&
      this.myLoginForm.get(campo)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }

  login(){
    const {username, password}  = this.myLoginForm.value;

    this.authService.loginUser(username, password)
        .subscribe((resp) => {
          if (this.myLoginForm.get('remember')?.value) {
            localStorage.setItem('username', this.myLoginForm.get('username')?.value)
          } else {
            localStorage.removeItem('username')
          }

          //Navegamos al Dashboard
          this.router.navigateByUrl('/dashboard')
        },
        (err) => {
          Swal.fire('ERROR', err.error.message, 'error')
        })
  }
}
