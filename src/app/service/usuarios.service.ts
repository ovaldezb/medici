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

  deleteUsuario(idUsuario:string, email:string):Observable<any>{
    return this._http.delete(Global.urlUsuario+'/'+idUsuario+'/'+email,{observe:'response'});
  }
}
