export class Sucursal{
  constructor(
    public _id:string,
    public identificador:string,
    public direccion: string,
    public codigoPostal: string,
    public nombreAdmin: string,
    public telefono:string,
    public isEnabled: Boolean
  ){}
}