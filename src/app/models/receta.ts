import { Cita } from "./citas";
import { MedicamentoReceta } from "./medicamentoReceta";
import { Paciente } from "./paciente";
export class Receta{
  constructor(
    public _id:string,
    public paciente:Paciente,
    //public cita:Cita,
    public medicamentoReceta:MedicamentoReceta[],
    public fechaReceta:Date
  ){}
}