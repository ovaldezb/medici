export class Medicamento{
  constructor(
    public _id:string,
    public familia:string,
    public nombre:string,
    public dosisAdulto:string,
    public dosisNino: string,
    public dosisMaxima: string,
    public indicaciones: string,
    public contraIndicaciones: string,
    public presentaciones: string
  ){}
}