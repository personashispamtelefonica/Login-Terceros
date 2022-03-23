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
