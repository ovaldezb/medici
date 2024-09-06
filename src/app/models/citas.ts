import { IUser } from "./user";
import { Paciente } from "./paciente";
import { Signos } from './signos';
import { MedicamentoReceta } from "./medicamentoReceta";

export class Cita{
  constructor(
    public _id:string,
    public paciente: Paciente,
    public medico: IUser,
    public fechaCita: Date,
    public horaCita: string,
    public horaCitaFin:Date,
    public horaConsultaInicio: Date,
    public isSignosTomados: boolean,
    public signos:Signos[],
    public isAtendido:boolean,
    public medicamentoReceta:MedicamentoReceta[],
    public exploracionFisica: string,
    public diagnostico: string,
    public tratamiento: string,
    public horaTomaSignos: Date,
    public horaCreaCita: Date,
    public noReceta:string,
    public duracion:number,
    public motivoInterconsulta:string,
    public isInterconsulta:boolean,
    public medicoInterconsulta:IUser,
    public horaCitaDuracion?:string
  ){}
}