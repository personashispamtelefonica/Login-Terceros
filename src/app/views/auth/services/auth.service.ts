import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthResponse, LoginForm } from '../interfaces/auth-interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  toggleUserPanel$ = new EventEmitter<boolean>();

  private _usuario!: LoginForm;

  constructor(private http: HttpClient, private router: Router) {}

  get usuario() {
    return { ...this._usuario };
  }

  login(username: string, password: string) {
    const url =
      'http://aks-hispam-prd.eastus.cloudapp.azure.com/third/v1/login';
    const body = { username, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.logged) {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            username: resp.username!,
            password: resp.password!,
          };
        }
      }),
      map((valid) => valid.logged),
      catchError((err) => of(err.error.msg))
    );
  }

  logout() {
    this.router.navigateByUrl('public/qr');
    localStorage.clear();
  }

  getUsername() {
    const decodedToken: any = this.decodeToken();
    return decodedToken ? decodedToken.displayname : '';
  }

  decodeToken() {
    const token = this.getToken();
    if (token) {
      return jwt_decode(token);
    } else {
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    let validSession = false;
    let decodedToken: any = null;

    try {
      if (token) {
        decodedToken = jwt_decode(token);
      }

      if (
        decodedToken && decodedToken.exp && decodedToken.exp > Date.now() / 1000
      ) {
        validSession = true;
      }
      return validSession;
    } catch (err) {
      return false;
    }
  }
}

