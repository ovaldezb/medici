import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class PregresafService {

  constructor(private _http:HttpClient) { }

  getAllPreguntas():Observable<any>{
    return this._http.get(Global.urlPreResAF,{observe:'response'});
  }
}
