export class SalidaEfectivo{
  constructor(
    public _id:string,
    public cantidad:number,
    public comentario:string,
    public sucursal:string,
    public fechaSalida:Date
  ){}
}