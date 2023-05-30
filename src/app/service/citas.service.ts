import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cita } from "../models/citas";
import { Global } from "./Global";

@Injectable()
export class CitasService{
  

  constructor(private _http:HttpClient){
  }

  addCita(cita:Cita, token:any):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization',token);
    return this._http.post(Global.urlCita,cita,{observe: 'response'});
  }

  getCitasByFechaAndMedico(fechaFiltro:string, idMedico:string, token:any):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization',token);
    return this._http.get(Global.urlCita+'/'+fechaFiltro+'/'+idMedico,{headers: headers});
  }
  
  getCitasByFecha(fechaFiltro:string, token:any):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization',token);
    return this._http.get(Global.urlCita+'/'+fechaFiltro,{headers: headers});
  }

  updateCita(idCita:String,cita:Cita, token:any):Observable<any>{
    return this._http.put(Global.urlCita+'/'+idCita,cita,{observe: 'response'});
  }

  deleteCita(idCita:String, token:any):Observable<any>{
    return this._http.delete(Global.urlCita+'/'+idCita,{observe:'response'});
  }
}