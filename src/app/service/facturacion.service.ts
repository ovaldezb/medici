import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Timbrado } from '../models/timbrado';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(private _http:HttpClient) { }

  emisionFactura(factura:Timbrado):Observable<any>{
    console.log('EMision Factura',factura);
    return this._http.post(Global.urlFactura,factura,{observe:'response'});
  }
}
