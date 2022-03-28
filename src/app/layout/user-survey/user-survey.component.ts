import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  usuario: any = {
    acepta: '',
  };
  encuestaList: Encuesta[] = [];
  validForm: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obternerEncuesta();
  }

  obternerEncuesta() {
    this.usuarioService.getEncuesta().subscribe((res: any) => {
      if (res && res.length) {
        this.encuestaList = res;
        console.log('COMPANY', res);
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
    Swal.fire(
      'Guardar Encuesta!',
      'La encuesta de guardo con éxito',
      'success'
    );
    this.usuarioService.saveEncuesta(request).subscribe((res: any) => {
      console.log(res);
      if (res) {
        console.log('COMPANY', res);
      }
    });

    console.log(request);
  }
}
