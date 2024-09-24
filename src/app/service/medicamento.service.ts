import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  constructor(private _http:HttpClient) { }

  getMedicamentos(nombre:string):Observable<any>{
    return this._http.get(Global.urlMedicamt+'/'+nombre,{observe:'response'});
  }

  getAllMedicamentos(offset:number):Observable<any>{
    return this._http.get(Global.urlMedicamt+'?size='+Global.PAGE_SIZE+'&offset='+offset,{observe:'response'});
  }

  addMedicamento(medicamento:any):Observable<any>{
    return this._http.post(Global.urlMedicamt,medicamento,{observe:'response'});
  }

  updateMedicamento(idMedicamento:string,medicamento:any):Observable<any>{
    return this._http.put(Global.urlMedicamt+'/'+idMedicamento,medicamento,{observe:'response'});
  }
}
