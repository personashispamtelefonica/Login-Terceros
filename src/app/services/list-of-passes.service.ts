import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListOfPassesService {

  constructor(private http: HttpClient) { }


  getListOfPasses():Observable<any> {
    const urlListPasses ='http://localhost:3000/listPases'

    return this.http.get(urlListPasses);
  }

}
