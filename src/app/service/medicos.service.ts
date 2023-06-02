import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./Global";

@Injectable()
export class MedicosService{
  

  constructor(private _http:HttpClient){
  }

  getAllMedicos():Observable<any>{
    return this._http.get(Global.urlMedico,{observe: 'response'});
  }

  getMedicoByEmail(email:string):Observable<any>{
    return this._http.get(Global.urlMedico+'/'+email,{observe: 'response'});
  }
}