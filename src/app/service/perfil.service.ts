import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private _http:HttpClient) { }

  addPerfil(perfil:any):Observable<any>{
    return this._http.post(Global.urlPerfil, perfil,{observe:'response'});
  }

  getAllPerfiles():Observable<any>{
    return this._http.get(Global.urlPerfil,{observe:'response'});
  }

  updatePerfil(idPerfil:string, perfil:any):Observable<any>{
    return this._http.put(Global.urlPerfil+'/'+idPerfil,perfil,{observe:'response'})
  }

  deletePerfil(idPerfil:string):Observable<any>{
    return this._http.delete(Global.urlPerfil+'/'+idPerfil,{observe:'response'});
  }
}
