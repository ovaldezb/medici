import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private _http:HttpClient) { }

  getAllUsuarios():Observable<any>{
    return this._http.get(Global.urlUsuario,{observe:'response'});
  }

  updateUsuario(idUsuario:string, email:string, flag:boolean, usuario:any):Observable<any>{
    return this._http.put(Global.urlUsuario+'/'+idUsuario+'/'+email+'/'+flag,usuario,{observe:'response'});
  }
}
