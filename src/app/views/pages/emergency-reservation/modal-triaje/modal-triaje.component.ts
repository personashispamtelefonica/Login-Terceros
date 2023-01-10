import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { reservationStatus } from '../emergency-reservation.component';
import { ChairDTO, FlatDTO, requestReservation, rplaceMod, ServService, towerMod } from '../serv.service';

@Component({
  selector: 'app-modal-triaje',
  templateUrl: './modal-triaje.component.html',
  styleUrls: ['./modal-triaje.component.scss']
})
export class ModalTriajeComponent implements OnInit {
  @BlockUI() block!:NgBlockUI;

  // DATA INICIAL
  fltdata={
    idcampus:     2,
    date:         new Date().toISOString().substring(0,10),
    campusname:   'Surquillo',
    period:       'FULLD'
  } 

  // VARIABLES
  newreservationData:rplaceMod = {
    campusId:   0,
    flatId:     0,
    siteId:     0,
    campusName: '',
    tower:      '',
    flatName:   '',
    siteName:   '',
    typeCode:   '',
    capacity:   0
  }

  request!:requestReservation;

  newReservationFlag = false;
  showqr      = false;
  showtriaje  = false;
  showForm    = false;
  indata:reservationStatus;

  constructor(private ref: MatDialogRef<ModalTriajeComponent>,
    private serv:ServService,
    @Inject(MAT_DIALOG_DATA) public data:{resstatus:reservationStatus}) { 
      this.indata = data.resstatus;
    }

  ngOnInit(): void {
    if (this.indata.status){
      // TIENE RESERVA
      if (this.indata.reservation.surveyresult == false){
        // YA RESPONDIÓ EL TRIAJE
        this.showqr = true;
      }else{
        // AÚN NO RESPONDE EL TRIAJE
        this.showtriaje = true;
      }
    }else{
      // NO TIENE RESERVA
      this.newReservationFlag = true;
      this.newreservationData.campusId = this.fltdata.idcampus;
      this.newreservationData.campusName = this.fltdata.campusname;
      this.showForm = true;
      this.loadTowers();
    }

  }

  loadingTowers = false;
  siteLodear = false;
  towers:towerMod[] = [];
  flats:FlatDTO[] = [];
  sites:ChairDTO[] = []; 

  loadTowers(){
    this.loadingTowers = true;
    const s = this.serv.getTowers$(this.fltdata.idcampus, true, this.fltdata.date, this.fltdata.period )
    .subscribe( resp => {
      this.loadingTowers = false;
      this.towers = resp;
      // SELECCIONAR POR DEFECTO
      if ( this.towers.length == 1 ) this.pickTower(this.towers[0].name);
      s.unsubscribe();
    },()=>{
      Swal.fire("Error","No fue posible cargar los pisos.","error");
      this.loadingTowers = false;
      s.unsubscribe();
    })
  }
  
  pickTower(name:string){
    this.resetData(2);
    const tower = this.towers.find(p=>p.name==name);
    this.newreservationData.tower = name;
    if (tower)
      this.flats = tower.flats;
  }
  
  
  pickFlat(id:number){
    this.resetData(3);
    const flat = this.flats.find(p=>p.id==id);
    if (flat){
      this.newreservationData.flatName= flat.name;
      this.newreservationData.typeCode= flat.typeCod;
      if (this.newreservationData.typeCode == "FIX" ){
        this.siteLodear = true;
        const s = this.serv.getSites$(this.newreservationData.flatId ,  this.fltdata.date, this.fltdata.period )
        .subscribe( resp => {
          this.siteLodear = false;
          this.sites = resp.filter(p=>p.enable);
          s.unsubscribe();
        },()=>{
          Swal.fire("Error","No fue posible cargar los sitios.","error")
          this.siteLodear = false;
          s.unsubscribe();
        });
      }else{
        this.newreservationData.capacity = flat.availableSites||0;
      }
    }
  }

  pickSite(id:number){
    const site = this.sites.find(p=>p.id==id);
    this.newreservationData.siteName = site?.code || '';
  }

  resetData(lvl:number){
    if (lvl==1){
      this.newreservationData.tower='';
      this.towers = [];
      this.flats = [];
    }
    if (lvl<=2){
      this.newreservationData.flatId=0;
      this.newreservationData.flatName='';
      this.newreservationData.typeCode='';
      this.sites = [];
    }
    if (lvl<=3){
      this.newreservationData.siteId=0;
      this.newreservationData.siteName='';
    }
  }

  doNewReservation(){
    const request:requestReservation = {
      idflat:     this.newreservationData.flatId,
      idsite:     this.newreservationData.siteId!=0?this.newreservationData.siteId:null,
      type:       this.newreservationData.typeCode,
      datefrom:   this.fltdata.date,
      dates:      [this.fltdata.date],
      useremail:  'antony.becerravargas@telefonica.com',
      period:     "FULLD",
      start:      "09:00",
      end:        "18:30",
      days:       "",
      recurrence: false,
      weeks:      null,
      dateto:     null,
      createdBy: 'EMERGENCIA',
    }

    this.block.start("Validando reservación...");
    this.serv.addNewReservation$(request).subscribe(r=>{
      this.block.stop();
      if (r.done){
        this.indata = {
          status:  true,
          message: "",
          reservation: {
            id: r.idmap[0].id,
            rdate: this.fltdata.date,
            campus: this.fltdata.campusname,
            surveyresult: false
          }
        }
        this.showtriaje = false;
        this.showForm = false;
        this.showqr = true;
      }else{
        Swal.fire("No se pudo realizar reservación" ,r.message,'error');
      }
    }, ()=>{
      this.block.stop();
      Swal.fire("Error en el servidor","",'error');
    })
  }

  showTriaje(){
    console.log(this.newreservationData);
    this.showtriaje = true;
    this.showForm = false;
    this.showqr = false;
  }
  showQRCode(){
    if (this.newReservationFlag){
     this.doNewReservation(); 
    }else{
      this.showtriaje = false;
      this.showForm = false;
      this.showqr = true;
    }
  }
  close(){
    this.ref.close();
  }
}
