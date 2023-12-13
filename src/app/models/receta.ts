import { Cita } from "./citas";
import { MedicamentoReceta } from "./medicamentoReceta";
export class Receta{
  constructor(
    public _id:string,
    public cita:Cita,
    public medicamentoReceta:MedicamentoReceta[],
    public fechaReceta:Date
  ){}
}