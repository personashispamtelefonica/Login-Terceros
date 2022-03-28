import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Encuesta } from '../models/usuario.models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {


  constructor(private http: HttpClient) {}

  getEncuesta():Observable<any> {
    const url_encuesta =
      'https://aks-hispam-dev.eastus.cloudapp.azure.com/workstationsapi/v1/healthsurvey?country=PER&type=ACCESS&all=false';

    return this.http.get(url_encuesta);
  }

  saveEncuesta(request:any):Observable<any>{
    return of(true)
  }
}
