import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

export interface qrvalidator {
  valid: boolean;
  message: string;
  code: string;
  user: string;
  string: string;
  period: string;
  place: string;
}

@Component({
  selector: 'app-users-qr',
  templateUrl: './users-qr.component.html',
  styleUrls: ['./users-qr.component.scss'],
})
export class UsersQrComponent implements OnInit {
  @Input('usersQR') usersQR:string = ''
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild(QrScannerComponent) qrScannerComponent!: QrScannerComponent;

  detail!: any;
  scanningQR = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

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

  validateCode(code: string): boolean {
    let splited: string[] = code.split('-');
    console.log(splited);
    if (splited.length != 4) return false;
    if (splited[0] !== 'TELHIS') return false;
    if (parseInt(splited[1]) == NaN) return false;
    if (parseInt(splited[2]) == NaN) return false;
    if (parseInt(splited[3]) == NaN) return false;
    return true;
  }

  callApi(result: string) {
    this.blockUI.start('Validando');
    this.http
      .get<qrvalidator>(
        'https://aks-hispam-prod.eastus.cloudapp.azure.com/workstationsapi/v1/check-qr?code=' +
          result
      )
      .subscribe(
        (resp) => {
          this.blockUI.stop();
          if (resp.valid) {
            if (this.getTodayDateAsString() == resp.string.substring(0, 10)) {
              const place = resp.place != null ? resp.place : 'cualquiera';
              Swal.fire({
                title: 'Código válido',
                html:
                  ' <div> <b>Usuario:</b> ' +
                  resp.user +
                  ' </div><div> <b>Sede:</b> ' +
                  place +
                  ' </div><div> <b>Fecha:</b> ' +
                  resp.string.substring(0, 10) +
                  ' </div> ',
              });
            } else {
              Swal.fire('', 'Esta reserva es para otro día', 'warning');
            }
          } else {
            Swal.fire('Código inválido', resp.message, 'error');
          }
        },
        () => {
          Swal.fire('Código inválido', 'No se pudo leer', 'error');
          this.blockUI.stop();
        }
      );
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

  getTodayDateAsString(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
    //return "2022-02-21";
  }
}
