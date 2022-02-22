import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../views/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {


  constructor(private authService: AuthService,
              private router: Router){ }

  canActivate(): Observable<boolean> | boolean {
    //redirigimos al '/auth' al usuario si en caso borra el token del localStorage
    return this.authService.validarToken()
          .pipe(
            tap( estaAutenticado => {
              if (!estaAutenticado) {
                this.router.navigateByUrl('/api/login');
              }
            })
          )
  }

  canLoad(): Observable<boolean> | boolean {
    return this.authService.validarToken()
    .pipe(
      tap( estaAutenticado => {
        if (!estaAutenticado) {
          this.router.navigateByUrl('/api/login');
        }
      })
    )
  }
}
