export class PreguntaAF{
  constructor(
    public id: string,
    public respuestas:[{respuesta:string, valor:string}],
    public pregunta: string,
    public otro: string,
    public opcional:boolean
  ){}
}