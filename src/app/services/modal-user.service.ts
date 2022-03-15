import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUserService {

  constructor(private http: HttpClient) { }

  urlUser = 'http://localhost:3000/UsuariosList'

  crearUsuario(data:any){
    return this.http.post<any>(this.urlUser, data)
  }

  obtenerUsuario(){
    return this.http.get<any>(this.urlUser)
  }
}
