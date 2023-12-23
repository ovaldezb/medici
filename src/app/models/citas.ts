import { IUser } from "./user";
import { Paciente } from "./paciente";
import { Signos } from './signos';

export class Cita{
  constructor(
    public _id:string,
    public paciente: Paciente,
    public medico: IUser,
    public fechaCita: Date,
    public horaCita: String,
    public horaCitaFin:String,
    public duracion:number,
    public isSignosTomados: boolean,
    public signos:Signos[]
  ){}
}