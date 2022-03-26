import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Encuesta } from '../models/usuario.models';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  encuesta: Encuesta[] =[]

  constructor(private http: HttpClient) {}

  getEncuesta() {
    const url_encuesta =
      'https://aks-hispam-dev.eastus.cloudapp.azure.com/workstationsapi/v1/healthsurvey?country=PER&type=ACCESS&all=false';

    return this.http.get(url_encuesta);
  }
}
