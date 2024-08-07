export class Producto{
  constructor(
    public _id:string,
    public codigoBarras: string,
    public descripcion: string,
    public seVendePor: string,
    public precioCosto: number,
    public ganancia: number,
    public precioVenta: number,
    public precioMayoreo: number,
    public especialidad: string,
    public proveedor: number, // aqui puede cambiara un objecto
    public usaInventario: boolean,
    public existencia: number,
    public minimo:number,
    public maximo: number,
    public lote: string,
    public caducidad: Date,
    public isActivo:boolean
  ){}
}