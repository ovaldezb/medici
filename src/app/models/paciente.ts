export class Paciente{
  constructor(
    public _id:string,
    public nombre: string,
    public apellidoP: string,
    public apellidoM: string,
    public fechaNacimiento: Date,
    public sexo: string,
    public estatura: number,
    public telefono: string,
    public correo: string,
    public carnet:string
  ){}
}