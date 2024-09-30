import { VentaProducto } from "./ventaproducto";

export class Venta{
  constructor(
    public _id:string,
    public ventaProducto:VentaProducto[],
    public fechaVenta:Date,
    public iva:number,
    public subTotal:number,
    public total:number,
    public descuento:number,
    public noTicket:string,
    public formaPago: string,
    public cajero:string,
    public efectivo: number,
    public cambio: number,
    public banco:string,
    public noAprobacion:string,
    public noTransferencia:string,
    public isDevolucion:boolean,
    public isFacturado:boolean,
    public fechaFacturado:Date,
    public sucursal:string
  ){}
}