export class Usuario {

  constructor(
    public id: number,
    public nombre: string,
    public correo: string,
    public genero: string,
    public cargo: string,
    public pais: string,
    public empresa: string
  ) {}
}

export interface Encuesta {
    id: number;
    label:string;
    icon: string;
    country: string;
    enable: boolean;
    responseValue?: string;
}
