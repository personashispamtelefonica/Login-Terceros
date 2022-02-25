import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginForm } from '../interfaces/auth-interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public myLoginForm: FormGroup = this.fb.group({
     username: [ localStorage.getItem('username') || 'gherson.perez@telefonica.com', [Validators.required, Validators.email]],
     password: ['hola', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    const { username, password } = this.myLoginForm.value;

    this.authService.login( username, password )
      .subscribe( ok => {
        console.log('XL:',ok)
        if ( ok === true ) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', 'Credenciales incorrectas', 'error');
        }
      });
  }



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

}
