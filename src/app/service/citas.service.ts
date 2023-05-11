import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cita } from "../models/citas";
import { Global } from "./Global";

@Injectable()
export class CitasService{
  public headers : HttpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private _http:HttpClient){
  }

  addCita(cita:Cita):Observable<any>{
    return this._http.post(Global.urlCita,cita,{headers:this.headers});
  }

  getCitasByFechaAndMedico(fechaFiltro:string, idMedico:string):Observable<any>{
    return this._http.get(Global.urlCita+'/'+fechaFiltro+'/'+idMedico,{headers:this.headers});
  }
  
  getCitasByFecha(fechaFiltro:string):Observable<any>{
    return this._http.get(Global.urlCita+'/'+fechaFiltro,{headers:this.headers});
  }

  updateCita(idCita:String,cita:Cita):Observable<any>{
    return this._http.put(Global.urlCita+'/'+idCita,cita,{headers:this.headers});
  }
}