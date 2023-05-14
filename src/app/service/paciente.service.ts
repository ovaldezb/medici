import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./Global";
import { Paciente } from "../models/paciente";

@Injectable()
export class PacienteService{
  public headers : HttpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private _http:HttpClient){
  }

  addPaciente(paciente:Paciente):Observable<any>{
    return this._http.post(Global.urlPaciente,paciente,{observe: 'response'});
  }

  findPacienteByNombre(nombre:String):Observable<any>{
    return this._http.get(Global.urlPaciente+'/nombre/'+nombre,{observe: 'response'})
  }

  findPacienteByApellido(apellido:String):Observable<any>{
    return this._http.get(Global.urlPaciente+'/apellido/'+apellido,{observe: 'response'})
  }

  findPacienteByTelefono(telefono:String):Observable<any>{
    return this._http.get(Global.urlPaciente+'/telefono/'+telefono,{observe: 'response'})
  }

  updatePaciente(idPaciente:string, paciente:Paciente):Observable<any>{
    return this._http.put(Global.urlPaciente+'/'+idPaciente,paciente,{observe: 'response'})
  }

}