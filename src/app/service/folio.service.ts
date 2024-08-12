import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class FolioService {

  constructor(private _http:HttpClient) { }

  addFolio(folio:any):Observable<any>{
    return this._http.post(Global.urlFolio,folio,{observe:'response'})
  }

  getFolio(tipo:string, sucursal:string):Observable<any>{
    return this._http.get(Global.urlFolio+'/'+tipo+'/'+sucursal,{observe:'response'});
  }
}
