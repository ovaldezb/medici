import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./Global";
import { Medico } from "../models/medico";

@Injectable()
export class MedicosService{
  
  public headers : HttpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private _http:HttpClient){
  }

  addMedico(medico:any):Observable<any>{
    return this._http.post(Global.urlMedico,medico,{headers:this.headers});
  }

  getAllMedicos():Observable<any>{
    return this._http.get(Global.urlMedico,{headers:this.headers});
  }

  deleteMedico(idMedico:String):Observable<any>{
    return this._http.delete(Global.urlMedico+'/'+idMedico,{headers:this.headers});
  }

  updateMedico(idMedico:String, medico:Medico):Observable<any>{
    return this._http.put(Global.urlMedico+'/'+idMedico,medico,{headers:this.headers});
  }
}