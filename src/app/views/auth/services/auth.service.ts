import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, LoginForm } from '../interfaces/auth-interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  toggleUserPanel$ = new EventEmitter<boolean>();

  private baseUrl: string = environment.baseUrl;
  private _usuario!: LoginForm;


  constructor(private http: HttpClient) {}


  get usuario() {
    return { ...this._usuario };
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  //const url  = `${this.baseUrl}/api/login`;
  /* https://aks-hispam-dev.eastus.cloudapp.azure.com/third/v1/api/login */
/*   login(username: string, password: string) {
    const url = 'https://aks-hispam-dev.eastus.cloudapp.azure.com/third/v1/api/login';
    const body = { username, password };

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap((resp) => {
        console.log('ABCD', resp);
        if (resp.logged) {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            username: resp.username!,
            password: resp.password!,
          };
        }
      }),
      map((valid) => valid.logged),
      catchError((err) => of(true))
    );
  } */

  /*   const httpOptions = {
      headers: new HttpHeaders({
        errorhandling:"local"
      })
    }; */
  loginUser(body:LoginForm): Observable<any> {

    const url = 'https://aks-hispam-dev.eastus.cloudapp.azure.com/third/v1/api/login';

    return this.http.post(url, body).pipe(
      tap((resp: any) => {
        this.guardarLocarlStorage(resp.token);
      })
    );
  }

  guardarLocarlStorage(token: string) {
    localStorage.setItem('token', token);
  }



 /*  export function removeNullValues(obj):any {
    var propNames = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i];
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  } */


  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/api/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        console.log('T O K E N', resp.token);
        localStorage.setItem('token', resp.token!);
        this._usuario = {
          username: resp.username!,
          password: resp.password!,
        };
        return resp.logged;
      }),
      catchError((err) => of(false))
    );
  }

  /* Limpiamos el localStorage */
  logout() {
    localStorage.clear();
  }
}

/* cathError(err => of(err.error.msg)) */
