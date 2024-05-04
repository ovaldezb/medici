import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta';
import { Global } from './Global';
@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(private _http:HttpClient) { }

  saveReceta(receta:Receta):Observable<any>{
    return this._http.post(Global.urlReceta,receta,{observe:'response'});
  }

  getRecetaByPacienteId(idPaciente:string):Observable<any>{
    return this._http.get(Global.urlReceta+'/'+idPaciente,{observe:'response'});
  }

}
