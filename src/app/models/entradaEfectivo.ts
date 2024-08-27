export class EntradaEfectivo{
  constructor(
    public _id:string,
    public cantidad:number,
    public comentario: string,
    public sucursal:string,
    public fechaEntrada:Date
  ){}
}