export class Enfermedad{
  constructor(
    public _id:string,
    public fechaAlta: Date,
    public patologia: string,
    public sintomas: string
  ){}
}