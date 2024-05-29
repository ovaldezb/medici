import { Cita } from "./citas";
import { MedicamentoReceta } from "./medicamentoReceta";
import { Paciente } from "./paciente";
export class Receta{
  constructor(
    public medicamentoReceta:MedicamentoReceta[],
  ){}
}