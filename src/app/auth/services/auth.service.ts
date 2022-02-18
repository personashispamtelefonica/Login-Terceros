import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth-interfaces';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return {... this._usuario}
  }

  constructor(private http: HttpClient) {}


  login(email: string, password: string) {
    const url  = `${this.baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
                    .pipe(
                      tap(resp => {
                        if (resp.ok) {

                          localStorage.setItem('token',resp.token!)
                          this._usuario = {
                            uid: resp.uid!,
                            name: resp.name!,
                            email:resp.email!,
                          }
                        }
                      }),
                      map( valid => valid.ok),
                      catchError(err => of(true))
                    );
  }

  validarToken():Observable<boolean>{
    const url     = `${this.baseUrl}/auth/renew`
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, {headers})
                    .pipe(
                      map( resp => {
                        console.log('T O K E N',resp.token)
                        localStorage.setItem('token', resp.token!)
                        this._usuario = {
                          name : resp.name!,
                          uid  : resp.uid!,
                          email: resp.email!
                        }
                        return resp.ok
                       }),
                      catchError(err => of(false)) /* Cuando el TOKEN es incorrecto */
                    );
  }

  /* Limpiamos el localStorage */
  logout(){
    localStorage.clear()
  }
}

/* cathError(err => of(err.error.msg)) */
