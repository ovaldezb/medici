import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import {  mergeMap } from 'rxjs/operators'
import { CognitoService } from './cognito.service';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class HttpCognitoInterceptorService implements HttpInterceptor{

  constructor(private cognitoService: CognitoService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.get(Global.SKIP_HEADER)){
      return next.handle(req);
    }
    return from(this.cognitoService.getCurrentSession()).pipe(mergeMap(resp =>{
      let token = resp.getIdToken().getJwtToken();
      req = req.clone({
        setHeaders:{
          Authorization: token
        }
      });
      return next.handle(req);
    }));
  }
}
