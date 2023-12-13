import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {

  constructor(private _http:HttpClient) { }

  getMedicamentos(nombre:string):Observable<any>{
    return this._http.get(Global.urlMedicamt+'/'+nombre,{observe:'response'});
  }
}
