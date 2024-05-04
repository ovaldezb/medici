export class RespuestasBySeccion {
  constructor(
    public seccion: string,
    public respuestas:{noPregunta:string,valor:boolean}[]
  ){}
}