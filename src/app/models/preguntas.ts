export class Pregunta{
  constructor(
    public id: string,
    public seccion:string,
    public pregunta: string,
    public noPregunta: string,
    public boleano: boolean
  ){}
}