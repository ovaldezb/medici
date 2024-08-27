import { Paciente } from "./paciente";
import { TipoRespuestaAF } from "./tipoRespuestaAF";

export class RespuestasAF{
  constructor(
    public _id: string,
    public paciente: Paciente,
    public respuestas: TipoRespuestaAF[],
  ){}
}