import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http:HttpClient) { }

  addProducto(producto:Producto):Observable<any>{
    return this._http.post(Global.urlProducto,producto,{observe:'response'});
  }

  findProductoByCodigoBarras(codigoBarras:string):Observable<any>{
    return this._http.get(Global.urlProducto+'/'+codigoBarras+'?action=codigo',{observe:'response'});
  }

  findProductoByDesc(desc:string):Observable<any>{
    return this._http.get(Global.urlProducto+'/'+desc+'?action=desc',{observe:'response'});
  }

  updateProduct(product:Producto):Observable<any>{
    return this._http.put(Global.urlProducto+'/'+product._id,product,{observe:'response'});
  }

  deleteProduct(idProducto:string):Observable<any>{
    return this._http.delete(Global.urlProducto+'/'+idProducto,{observe:'response'});
  }
}
