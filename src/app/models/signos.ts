
import { Paciente } from "./paciente";

export class Signos{
  constructor(
    public _id:string,
    public paciente: Paciente,
    public temperatura: number,
    public estatura: number,
    public peso:number,
    public presionSis:number,
    public presionDias:number,
    public fechaToma: Date,
    public frecuenciaCardiaca: number,
    public frecuenciaRespiratoria: number,
    public spo2:number,
    public glucotest:number,
    public descripcion:string,
    public escalaDolor: number,
    public imc:number
  ){}
}