import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalCompanyService {

  constructor(private http: HttpClient) { }

  urlCompany = 'http://localhost:3000/CompanyList'

  addCompany(data:any){
    return this.http.post<any>(this.urlCompany, data)
  }

  getCompany(){
    return this.http.get<any>(this.urlCompany)
  }

  updateCompany(data:any, id:number){
    return this.http.put(this.urlCompany +'/'+ id, data)
  }

  deleteCompany(id:number){
    return this.http.delete<any>(this.urlCompany +'/'+ id)
  }


}
