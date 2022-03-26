import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'


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
  encuestaList: Encuesta[] =[]


 /*  myForm: FormGroup = this.fb.group({
    id:       ['', Validators.required],
    label:    ['¿Estás tomando alguna medicación o droga?', Validators.required],
    icon:     [null],
    country:  ['PER', Validators.required],
    enable:   [false],
  }); */

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obternerEncuesta();
  }

  obternerEncuesta(){
    this.usuarioService.getEncuesta()
        .subscribe( (res:any) => {
          this.encuestaList = res
        console.log('COMPANY', res);
      },
     )
  }

  guardar(){

  }

  /* onChangeRestriction(i: number) {
    this.encuestaList[i].enable = this.findFalseRestriction(i);
  }
 */
 /*  findFalseRestriction(i: number): boolean {
    const hasAFalse = this.encuestaList[i].enable.find(
      (restriction) => !restriction.enable
    );
    return hasAFalse ? false : true;
  } */


}
