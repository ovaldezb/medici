import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sucursal } from '../models/sucursal';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  
  constructor(private _httpClient:HttpClient) { }

  addSucursal(sucursal:Sucursal):Observable<any>{
    return this._httpClient.post(Global.urlSucursal,sucursal,{observe: 'response'});
  }

  getAllSucursales():Observable<any>{
    return this._httpClient.get(Global.urlSucursal,{observe: 'response'});
  }

  updateSucursal(sucursal:Sucursal):Observable<any>{
    return this._httpClient.put(Global.urlSucursal+'/'+sucursal._id,sucursal,{observe: 'response'});
  }

  deleteSucursal(idSucursal:string):Observable<any>{
    return this._httpClient.delete(Global.urlSucursal+'/'+idSucursal,{observe: 'response'});
  }
}
