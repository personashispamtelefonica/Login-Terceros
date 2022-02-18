import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public myLoginForm: FormGroup = this.fb.group({
    email: [ localStorage.getItem('email') || 'usuario1@gmail.com', [Validators.required, Validators.email]],
    //email: ['yovany.21se@gmail.com', [Validators.required, Validators.email]],

    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  campoNoValido(campo: string): boolean {
    if ( this.myLoginForm.get(campo)?.invalid &&  this.myLoginForm.get(campo)?.touched ) {
      return true;
    } else {
      return false;
    }
  }

  logIn() {
    console.log('VALUE',this.myLoginForm.value);

    const { email, password } = this.myLoginForm.value;

    this.authService.login(email, password)
        .subscribe((ok) => {
            console.log('R E S P U E S T A: ',ok);
            if (ok==true) {
              this.router.navigateByUrl('/dashboard')
            }else{
              Swal.fire('Error', 'El correo o password son incorrectos', 'error')
            }
          });

  }

}
