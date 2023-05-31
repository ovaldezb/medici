import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators'
import { CognitoService } from './cognito.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCognitoInterceptorService implements HttpInterceptor{

  constructor(private cognitoService: CognitoService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
