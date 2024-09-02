import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate, UrlTree } from '@angular/router';
import { CognitoService } from './cognito.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private cognitoService: CognitoService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if(this.cognitoService.isAuthenticated()){
      return true;
    }else{
      this.route.navigate(['login']);
      return false;
    }
  }
}
