import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../views/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

constructor( private authService: AuthService,
            private route: Router) {
}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |boolean {

      if (this.authService.isLoggedIn() ) {
        this.route.navigate(['/'])
        return false
      } else {
        return true
      }
    }


}
