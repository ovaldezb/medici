export class Paciente{
  constructor(
    public _id:string,
    public nombre: string,
    public apellidoP: string,
    public apellidoM: string,
    public fechaNacimiento: Date,
    public sexo: string,
    public telefono: string,
    public correo: string,
    public ocupacion: string,
    public escolaridad:string,
    public raza: string,
    public carnet:string,
    public codigoPostal:string
  ){}
}