import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Encuesta } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

export interface UserRestriction {
  idRestriction: number;
  enable: boolean;
}

@Component({
  selector: 'app-user-survey',
  templateUrl: './user-survey.component.html',
  styleUrls: ['./user-survey.component.scss'],
})
export class UserSurveyComponent implements OnInit {
  cargando:boolean = true;
  usuario: any = {
    acepta: '',
  };
  encuestaList: Encuesta[] = [];
  validForm: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.obternerEncuesta();
  }

  obternerEncuesta() {
    this.cargando = true
    this.usuarioService.getEncuesta().subscribe((res: any) => {
      if (res && res.length) {
        this.encuestaList = res;
        console.log('COMPANY', res);
        this.cargando = false
      }
    });
  }

  changeAnswerValue(index: number, enable: boolean) {
    this.encuestaList[index].enable = enable;
    this.encuestaList[index].responseValue = enable ? 'S' : 'N';

    this.validForm =
      this.encuestaList.filter((item) => item.responseValue).length ==
      this.encuestaList.length;
  }

  guardar() {
    const request = this.encuestaList.map((item) => {
      return {
        id: item.id,
        nombre: item.label,
        enable: item.enable,
      };
    });

    this.usuarioService.saveEncuesta(request)
        .subscribe((res: any) => {
          if (res) {
            const isInvalid = this.encuestaList.find((item) => item.enable);
            console.log(isInvalid);

            Swal.fire(
              'Encuesta completada!',
              'Su pase es exitoso..Felicidades',
              'success'
            );
            // console.log('ENCUESTA', res);

            if (isInvalid) {
              Swal.fire('Error', 'Faltan requisitos por completar', 'error');

              this.router.navigateByUrl('/public/qr');
            } else {
              this.router.navigateByUrl('dashboard/pases');
            }
      }
    });

    console.log(request);
  }




  irEncuesta() {
    this.router.navigateByUrl('dashboard/encuesta');

  }
}
