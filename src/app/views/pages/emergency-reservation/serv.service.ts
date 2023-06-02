import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { reservationStatus } from './emergency-reservation.component';


// export const API_RESERVAS = 'https://apimngr-hispam-prod.azure-api.net/workstationsapi/v1';
export const API_RESERVAS = 'https://ms-reservation-back.azurewebsites.net/workstationsapi/v1';


@Injectable({
  providedIn: 'root'
})
export class ServService {

  httpOptions = {
    headers: new HttpHeaders({
      "Ocp-Apim-Subscription-Key": 'f60aac663e674ad1a899993ae09c41e9',
      user: 'antony'
    })
  };

  constructor(private http:HttpClient) { }

  getTowers$(idcampus:number, justenable:boolean, date?:string, period?:string){
    let params = "?";
    params = params + "idcampus=" + idcampus;
    if (date && period){
      params = params + "&date=" + date;
      params = params + "&period=" + period;
    }

    return this.http.get<FlatDTO[]>(API_RESERVAS + "flats" + params, this.httpOptions).pipe(
      map(resp=>{
        const towers:towerMod[] = [];
        resp.forEach( f => {
          if ( towers.findIndex(t => t.name == f.tower ) == -1)
            towers.push({
              name:f.tower,
              flats: resp.filter( p => p.tower == f.tower && ( (justenable && p.enable) || !justenable ) )
            });
        });
        return towers;
      })
    );
  }

  getSites$(idflat:number, date?:string, period?:string){
    let params = "?";
    params = params + "idflat=" + idflat;
    if (date && period){
      params = params + "&date=" + date;
      params = params + "&period=" + period;
    }
    return this.http.get<ChairDTO[]>(API_RESERVAS + "chairs" + params, this.httpOptions);
  }

  addNewReservation$(req:requestReservation){
    return this.http.post<reservationStatus>(API_RESERVAS + "reservations/new-reservation",req, this.httpOptions);
  }
}

export interface FlatDTO {
  id: number;
  idCampus: number;
  name: string;
  tower: string;
  capacity: number;
  typeCod: string;
  image: string;
  interactive: boolean;
  enable: boolean;
  chairs?: ChairDTO[];
  availableSites?: number;
}
export interface ChairDTO {
  id: number;
  idflat: number;
  code: string;
  enable: boolean;
  available?: boolean;
}
export interface towerMod {
  name: string;
  flats: FlatDTO[];
}
export interface rplaceMod {
  campusId: number;
  campusName: string;
  flatId: number;
  flatName: string;
  typeCode: string;
  siteId: number;
  siteName: string;
  tower: string;
  capacity:number;
}
export interface requestReservation {
  useremail: string;
  datefrom: string;
  start: string;
  end: string;
  dateto: string | null;
  period: string;
  type: string;
  idflat: number;
  idsite: number | null;
  recurrence: boolean;
  dates: string[];
  weeks: number | null;
  days: string;
  createdBy: string;
}
