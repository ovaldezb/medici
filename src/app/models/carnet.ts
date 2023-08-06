import { Paciente } from "./paciente";
import { Cita } from "./citas";

export class Carnet{
  constructor(
    public _id: string,
    public folio: string,
    public fechaAlta: Date,
    public noConsultasDisponibles:number,
    public citas: Cita[],
    public pacientes: Paciente[] 
  ){}
}