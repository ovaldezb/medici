
import { Paciente } from "./paciente";

export class Signos{
  constructor(
    public _id:string,
    public paciente: Paciente,
    public temperatura: number,
    public estatura: number,
    public peso:number,
    public presionCis:number,
    public presionDias:number,
    public fechaToma: Date
  ){}
}