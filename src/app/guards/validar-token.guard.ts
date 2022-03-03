import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../views/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate {


  constructor(private authService: AuthService,
              private router: Router){ }

  canActivate(): Observable<boolean> | boolean {
    if (!this.authService.isLoggedIn()){
      this.router.navigateByUrl('/public/qr')
      return false;
    }
    return true;
  }


}
