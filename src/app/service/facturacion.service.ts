import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Timbrado } from '../models/timbrado';
import { Global } from './Global';
import { Receptor } from '../models/receptor';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(private _http:HttpClient) { }

  emisionFactura(factura:Timbrado, idVenta:String):Observable<any>{
    return this._http.post(Global.urlFactura+'/'+idVenta,factura,{observe:'response',
      headers:{
      'SKIP':'true'
      }});
  }

  guardarDatosFactura(receptor:Receptor):Observable<any>{
    return this._http.put(Global.urlFactura,receptor,{observe:'response',
      headers:{
      'SKIP':'true'
      }});
  }

  obtieneDatosFacturaByRFC(rfc:String):Observable<any>{
    return this._http.get(Global.urlFactura+'/rfc?rfc='+rfc,{
      observe:'response',
      headers:{
      'SKIP':'true'
      }
    });
  }

  obtieneDatosVentaByTicket(tipo:string,filtro:string,ticket:string,sucursal:string,fecha:string,total:string):Observable<any>{
    return this._http.get(Global.urlFactura+'/'+tipo+'?'+filtro+'='+ticket+'&sucursal='+sucursal+'&fecha='+fecha+'&total='+total,
      {
        observe:'response',
        headers:{
          'SKIP':'true'
        }
      }
    );
  }

  obtieneDatosVentaById(idVenta:string):Observable<any>{
    return this._http.get(Global.urlFactura+'/idventa?ventaId='+idVenta,
      {
        observe:'response',
        headers:{
          'SKIP':'true'
        }
      }
    );
  }

  obtieneListaUsoCfdis():Observable<any>{
    return this._http.get(Global.urlFactura+'/usocfdi',
      {
        observe:'response',
        headers:{
          'SKIP':'true'
        }
      }
    );
  }

  obtieneListaRegimenFiscal():Observable<any>{
    return this._http.get(Global.urlFactura+'/regimenfiscal',
      {
        observe:'response',
        headers:{
          'SKIP':'true'
        }
      }
    );
  }

  obtieneListaFormaPago():Observable<any>{
    return this._http.get(Global.urlFactura+'/formapago',
      {
        observe:'response',
        headers:{
          'SKIP':'true'
        }
      }
    );
  }
}
