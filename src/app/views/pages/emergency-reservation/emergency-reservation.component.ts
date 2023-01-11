import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ModalTriajeComponent } from './modal-triaje/modal-triaje.component';

@Component({
  selector: 'app-emergency-reservation',
  templateUrl: './emergency-reservation.component.html',
  styleUrls: ['./emergency-reservation.component.scss']
})
export class EmergencyReservationComponent implements OnInit {
  @BlockUI() block!:NgBlockUI;
  API_RESERVAS = 'https://apimngr-hispam-prod.azure-api.net/workstationsapi/v1/';
  httpOptions = {
    headers: new HttpHeaders({
      "Ocp-Apim-Subscription-Key": 'f60aac663e674ad1a899993ae09c41e9',
    })
  };

  constructor(private dialog:MatDialog, private http:HttpClient) { }

  ngOnInit(): void {
  }

  validateDNI(filter:string){
    this.block.start("Validando...");
    this.http.get<reservationStatus>(this.API_RESERVAS + 'reservations/search-reservation?filter='+filter,this.httpOptions).subscribe(resp=>{
      this.block.stop();
      this.dialog.open(ModalTriajeComponent,{data:{resstatus:resp},width:'80%', height:'80%'});
    });
  }

}

export interface reservationStatus{
  status      : boolean;
  message     : string;
  reservation : reservation;
  userEnable  : boolean;
  userExist   : boolean;
  email       : string;
}

export interface reservation{
  id              : number;
  surveyresult    : boolean;
  campus          : string;
  rdate           : string;
  interactive?    : boolean;
  checkinanswered?: boolean;
  activated?      : boolean;
  idflat?         : number;
  image?          : string;
  flat?           : string;
  rend?           : string;
  typec?          : string;
  city?           : string;
  user?           : string;
  period?         : string;
  tower?          : string;
  rstart?         : string;
  address?        : string;
  country?        : string;
  site?           : number;
  grouplead?      : string;
  groupid?        : number;
  party?          : string;
  recurrenceid?   : number;
  dfrom?          : string;
}