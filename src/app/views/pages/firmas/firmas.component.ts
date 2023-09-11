import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgBlockUI } from 'ng-block-ui/models/block-ui.model';
import Swal from 'sweetalert2';
import { API_SIGNATURE } from '../emergency-reservation/serv.service';
import { BlockUI } from 'ng-block-ui';
import { FormBuilder } from '@angular/forms';
import { QrScannerComponent } from 'angular2-qrscanner';

export interface qrvalidatorSignature {
  status: boolean;
  code: number;
  message: string;
  reservationCode: number;
}

@Component({
  selector: 'app-firmas',
  templateUrl: './firmas.component.html',
  styleUrls: ['../users-qr/users-qr.component.scss']
})
export class FirmasComponent implements OnInit {

  @Input('usersQR') usersQR: string = '';
  @BlockUI()
  blockUI!: NgBlockUI;

  @ViewChild(QrScannerComponent) qrScannerComponent!: QrScannerComponent;
  scanningQR = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private router:Router) {}

  ngOnInit(): void {
  }

  scanSiteQrCode() {
    this.scanningQR = true;

    setTimeout(() => {
      this.qrReader();

      const s = this.qrScannerComponent.capturedQr.subscribe((result) => {
        this.callApi(result);
        this.scanningQR = false;
        s.unsubscribe();
      });
    }, 1000);
  }

  videoDevices: MediaDeviceInfo[] = [];
  chooseCamera(id: string) {
    console.log(id);
    const dev: MediaDeviceInfo | undefined = this.videoDevices.find(
      (p) => p.deviceId == id
    );
    this.qrScannerComponent.chooseCamera.next(dev);
  }

  stopScanningQr() {
    this.scanningQR = false;
  }

  qrReader() {
    this.videoDevices = [];
    this.qrScannerComponent.getMediaDevices().then((devices) => {
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          this.videoDevices.push(device);
        }
      }

      if (this.videoDevices.length > 0) {
        let choosenDev = null;
        for (const dev of this.videoDevices) {
          if (dev.label.includes('back') || dev.label.includes('rear')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(this.videoDevices[0]);
        }
        this.qrScannerComponent.videoElement.setAttribute(
          'playsinline',
          'true'
        );
      }
    });
  }

  callApi(result: string) {
    this.blockUI.start('Validando');
    const httpOptions = {
    headers: new HttpHeaders({
      "Ocp-Apim-Subscription-Key": 'f60aac663e674ad1a899993ae09c41e9',
      user: 'antony'
    })
  };
  var splitted = result.split("_");
    this.http
      .get<qrvalidatorSignature>(API_SIGNATURE +  '?cip='+splitted[0]+'&namePeriod='+splitted[1], httpOptions)
      .subscribe(
        (resp) => {
          this.blockUI.stop();
          if (resp.status && resp.message!="No se pudo validar firma.") {
            // if (this.restDate(resp.string.substring(0, 10))) {
            //   const place = resp.place != null ? resp.place : 'cualquiera';
              Swal.fire({
                title: 'Código válido',
                text : resp.message,
                icon: 'success'
              });
            //  }
          } else {
            Swal.fire('Código inválido', resp.message, 'error');
          }
        },
        () => {
          Swal.fire('Error inesperado', 'Hay problemas para identificar el código.', 'error');
          this.blockUI.stop();
        }
      );
  }




}
