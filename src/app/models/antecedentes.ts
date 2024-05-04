import { Paciente } from "./paciente";
import { RespuestasBySeccion } from "./respuesta";

export class Antecedentes{
  constructor(
    public _id:string,
    //public paciente: Paciente,
    public edoCivil: string,
    public genero: string,
    public ocupacion: string,
    public pg1: boolean,
    public pg1Padecimiento: string,
    public pg2: boolean,
    public pg2Padecimiento: string,
    public pg3: boolean,
    public pg3Padecimiento: string,
    public pg3Parentesco: string,
    public respuestas: RespuestasBySeccion[]
    ){}
}