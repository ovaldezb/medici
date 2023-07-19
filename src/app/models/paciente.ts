export class Paciente{
  constructor(
    public _id:string,
    public nombre: string,
    public apellido: string,
    public fechaNacimiento: Date,
    public sexo: string,
    public estatura: number,
    public telefono: string,
    public carnet:string
  ){}
}