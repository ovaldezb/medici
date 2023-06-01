import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./Global";
import { Medico } from "../models/medico";

@Injectable()
export class MedicosService{
  

  constructor(private _http:HttpClient){
  }

  /*addMedico(medico:any):Observable<any>{
    return this._http.post(Global.urlMedico,medico,{observe: 'response'});
  }*/

  getAllMedicos():Observable<any>{
    return this._http.get(Global.urlMedico,{observe: 'response'});
  }

  getMedicoByEmail(email:string):Observable<any>{
    return this._http.get(Global.urlMedico+'/'+email,{observe: 'response'});
  }

  /*deleteMedico(idMedico:String):Observable<any>{
    return this._http.delete(Global.urlMedico+'/'+idMedico,{observe: 'response'});
  }*/

  /*updateMedico(idMedico:String, medico:Medico):Observable<any>{
    return this._http.put(Global.urlMedico+'/'+idMedico,medico,{observe: 'response'});
  }*/
}