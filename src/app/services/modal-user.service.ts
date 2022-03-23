import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class ModalUserService {
  usuario!:Usuario

  constructor(private http: HttpClient) { }


  urlUser = 'http://localhost:3000/UsuariosList'

  crearUsuario(data:any){
    return this.http.post<any>(this.urlUser, data)
  }

  obtenerUsuario(){
    return this.http.get<any>(this.urlUser)
  }

  updateUsers(data:any, id:number){
    return this.http.put(this.urlUser +'/'+ id, data)
  }

  deleteUsers(id: number){
    const url = `${this.urlUser}/${id}`
    return this.http.delete<any>(url)
  }


}
