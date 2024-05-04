import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';
import { Antecedentes } from '../models/antecedentes';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private _http:HttpClient) { }

  getPreguntas(seccion:string):Observable<any>{
    return this._http.get(Global.urlPregunta+'/'+seccion,{observe:'response'});
  }

  guardaAntecedentes(antecedentes:Antecedentes):Observable<any>{
    return this._http.post(Global.urlPregunta,antecedentes,{observe:'response'});
  }
}
