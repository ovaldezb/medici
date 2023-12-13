import { Time } from "@angular/common";
import { IUser } from "./user";
export class Disponibilidad{
  constructor(
    public _id:String,
    public medico:IUser,
    public dia:Date,
    public horaInicio: string,
    public horaFin: string
  ){}
}