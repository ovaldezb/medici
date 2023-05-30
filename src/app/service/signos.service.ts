import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Signos } from "../models/signos";
import { Global } from "./Global";

@Injectable()
export class SignosService{


  constructor(private _http:HttpClient){
  }

  addSignos(signos:Signos):Observable<any>{
    return this._http.post(Global.urlSignos,signos,{observe: 'response'});
  }

  updateSignos(idSignos:string, signos:Signos):Observable<any>{
    return this._http.put(Global.urlSignos+'/'+idSignos,signos,{observe: 'response'});
  }
}