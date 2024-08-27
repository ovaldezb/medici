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
    return this._http.get(Global.urlVentas+'/ticket',{observe:'response'});
  }

  agregaVenta(venta:any, action:string):Observable<any>{
    return this._http.post(Global.urlVentas+'/'+action,venta,{observe:'response'});
  }

  agregaEntradaSalidaEfectivo(entradaSalidaEfectivo:any,action:string):Observable<any>{
    return this._http.post(Global.urlVentas+'/'+action,entradaSalidaEfectivo,{observe:'response'});
  }

  getListaEntradas(fecha:string, sucursal:string):Observable<any>{
    return this._http.get(Global.urlVentas+'/entrada?fecha='+fecha+'&sucursal='+sucursal,{observe:'response'});
  }


  getListaSalidas(fecha:string, sucursal:string):Observable<any>{
    return this._http.get(Global.urlVentas+'/salida?fecha='+fecha+'&sucursal='+sucursal,{observe:'response'});
  }

}
