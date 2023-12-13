import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {

  constructor(private _http:HttpClient) { }

  addDisponibilidad(disponibilidad:any):Observable<any>{
    return this._http.post(Global.urlDisponib,disponibilidad,{observe:'response'})
  }

  getDisponibilidad(fechaIni:string,fechaFin:string,idMedico:string):Observable<any>{
    return this._http.get(Global.urlDisponib+'/'+fechaIni+'/'+fechaFin+'/'+idMedico,{observe:'response'})
  }

  deleteDisponibilidadById(idDisponibilidad:String):Observable<any>{
    return this._http.delete(Global.urlDisponib+'/'+idDisponibilidad,{observe:'response'});
  }

}
