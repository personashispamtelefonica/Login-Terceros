import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { QrScannerComponent } from 'angular2-qrscanner';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

  //encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  @ViewChild(QrScannerComponent) qrScannerComponent!: QrScannerComponent;
  //private dialog:MatDialogRef<DashboardComponent>) { }

  loading = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.router.navigateByUrl('/auth/registro');
    this.authService.logout();
  }

  /* QR SCANER ======================================================== */
  scanningQR = false;

  scanSiteQrCode() {
    this.scanningQR = true;

    setTimeout(() => {
      this.qrReader();
      const s = this.qrScannerComponent.capturedQr.subscribe((result) => {
        //  this.checkInSite(result);

        console.log('ABC', result);
        this.scanningQR = false;
        s.unsubscribe();
      });
    }, 1000);
  }

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

    /* abc */
    /* this.qrScannerComponent.capturedQr.subscribe((result) => {
      console.log(result);
    }); */
  }
}
