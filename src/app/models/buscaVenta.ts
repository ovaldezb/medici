export class BuscaVenta{
  constructor(
    public ticket:string,
    public sucursal:string,
    public fecha:Date,
    public total: number
  ){}
}