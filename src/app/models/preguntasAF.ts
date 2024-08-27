export class PreguntaAF{
  constructor(
    public _id: string,
    public respuestas:[{_id:string,respuesta:string, valor:string}],
    public pregunta: string,
    public opcional:boolean,
    public orden: number,
    public listaChecked:boolean[]
  ){}
}