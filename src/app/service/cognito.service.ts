import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;
  
  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    Auth.userAttributes
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes:{
        given_name:user.nombre,
        middle_name:user.apellidoP,
        family_name: user.apellidoM,
        birthdate: user.dob,
        gender: user.sexo,
        phone_number: user.telefono,
        'custom:perfil' : user.perfil,
        'custom:cedula' : user.cedula,
        'custom:isAdmin' : new String(user.isAdmin),
        'custom:rfc' : user.rfc,
        'custom:especialidad' : user.especialidad,
        'custom:isDisabled' : new String(user.isDisabled),
        'custom:sucursal': user.sucursal
      },
    });
  }

  public async confirmSignUp(user:IUser):Promise<any>{
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user:IUser):Promise<any>{
    return Auth.signIn(user.email, user.password)
    .then(()=>{
      this.authenticationSubject.next(true);
    });
  }

  public signOut():Promise<any>{
    return Auth.signOut()
    .then(()=>{
      this.authenticationSubject.next(false);
    });
  }

  public getUser():Promise<any>{
    return Auth.currentAuthenticatedUser();
  }

  public isAuthenticated():boolean{
    return this.authenticationSubject.value
  }

  public getCurrentSession():Promise<any>{
    return Auth.currentSession();
  }

  public forgotPassword(email:string):Promise<any>{
    return Auth.forgotPassword(email);
  }

  public forgotPasswordSubmit(email:string,code:string,newPassword:string):Promise<any>{
    return Auth.forgotPasswordSubmit(email,code,newPassword);
  }

}
