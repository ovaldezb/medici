import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private _http:HttpClient) { }

  getTicket():Observable<any>{
    return this._http.get(Global.urlVentas+'?action=ticket',{observe:'response'});
  }

  agregaVenta(venta:any):Observable<any>{
    return this._http.post(Global.urlVentas,venta,{observe:'response'});
  }
}
