import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Signos } from "../models/signos";
import { Global } from "./Global";

@Injectable()
export class SignosService{

  public headers : HttpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private _http:HttpClient){
  }

  addSignos(signos:Signos):Observable<any>{
    return this._http.post(Global.urlSignos,signos,{headers:this.headers});
  }

  updateSignos(idSignos:string, signos:Signos):Observable<any>{
    return this._http.put(Global.urlSignos+'/'+idSignos,signos,{headers:this.headers});
  }
}