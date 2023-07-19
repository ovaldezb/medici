export class IUser {
  constructor(
    public _id:string,
    public email: string,
    public password: string,
    public repeatPassword: string,
    public code: string,
    public name: string,
    public nombre:string,
    public apellidoP:string,
    public apellidoM:string,
    public telefono: string,
    public sexo: string,
    public perfil: string,
    public cedula: string,
    public isAdmin: boolean,
    public especialidad: string,
    public dob: string,
    public rfc: string,
    public isDisabled:boolean,
    public sucursal:string
  ){}
}