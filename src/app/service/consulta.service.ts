import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private _http:HttpClient) { }

  getPatologia(sintomas:string):Observable<any>{
    return this._http.get(Global.urlEnfermed+'/'+sintomas,{observe:'response'})
  }

}
