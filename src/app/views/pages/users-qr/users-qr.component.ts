import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QrScannerComponent } from 'angular2-qrscanner';
import { AuthService } from 'src/app/views/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-qr',
  templateUrl: './users-qr.component.html',
  styleUrls: ['./users-qr.component.scss']
})
export class UsersQrComponent implements OnInit {

  @ViewChild(QrScannerComponent) qrScannerComponent!: QrScannerComponent;

  //detail!: reservationDetail;
  detail!: any;


  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.router.navigateByUrl('/login');
    this.authService.logout();
  }

  /* QR SCANER ======================================================== */
  scanningQR = false;

  scanSiteQrCode() {
    this.scanningQR = true;

    setTimeout(() => {
      this.qrReader();
      const s = this.qrScannerComponent.capturedQr.subscribe((result) => {
        this.checkInSite(result);

        console.log('IMPRIMIR QR', result);
        this.scanningQR = false;
        s.unsubscribe();
      });
    }, 1000);
  }

  checkInSite(sitecode: string) {
    if (!this.validateCode(sitecode)) {
      Swal.fire(
        'Error de Código QR',
        'El código escaneado no está registrado.',
        'error'
      );
    } else {
      if (
        (this.detail.typec == 'FLEX' &&
          this.detail.idplace == this.getPartOfCode(sitecode, 2)) ||
        (this.detail.typec == 'FIX' &&
          this.detail.idplace == this.getPartOfCode(sitecode, 3))
      ) {

      } else {
        Swal.fire(
          'Código incorrecto',
          'El código escaneado no está asociado al lugar reservado previamente. Por favor, escanee el QR correcto.',
          'warning'
        );
      }
    }
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

  getPartOfCode(code: string, idx: number): number {
    let splited: string[] = code.split('-');
    if (idx < 1 || idx > 3) return 0;
    return parseInt(splited[idx]);
  }

  /* ================================ */
  stopScanningQr() {
    this.scanningQR = false;
  }

  qrReader() {
    this.qrScannerComponent.getMediaDevices().then((devices) => {
      console.log(devices);

      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

  }
}
