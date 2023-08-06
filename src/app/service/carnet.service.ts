import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';
import { Carnet } from '../models/carnet';

@Injectable()
export class CarnetService {

  constructor(private _http:HttpClient) { }


  addCarnet(carnet:Carnet):Observable<any>{
    return this._http.post(Global.urlCarnet,carnet,{observe:'response'});
  }

  getCarnetByFolio(folio:string):Observable<any>{
    return this._http.get(Global.urlCarnet+'/'+folio,{observe:'response'})
  }

  updateCarnet(idCarnet:string, carnet:Carnet):Observable<any>{
    return this._http.put(Global.urlCarnet+'/'+idCarnet,carnet,{observe:'response'});
  }

  updateCitasCarnet(folio:string, amount:number):Observable<any>{
    return this._http.patch(Global.urlCarnet+'/'+folio+'/'+amount,{observe:'response'})
  }
}
