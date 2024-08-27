import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/service/cognito.service';
import { IUser } from '../../models/user';
import Swal from 'sweetalert2';
import { Global } from 'src/app/service/Global';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public faUser = faUser;
  public faKey = faKey;
  public user: IUser;
  public perfiles:Array<String>=new Array();
  public version:string = Global.VERSION;

  constructor(private router: Router, private congnitoService: CognitoService){
    this.user = { } as IUser;
  }

  public signIn():void{
    this.congnitoService.signIn(this.user)
    .then(()=>{
      this.congnitoService.getUser()
      .then(user=>{
        this.perfiles = user.signInUserSession.accessToken.payload['cognito:groups'];
        const perfil = this.perfiles[0];
        switch (perfil){
          case Global.ADMINISTRADOR:
            this.router.navigateByUrl('/admon');
            break;
          case Global.ENFERMERA:
            this.router.navigateByUrl('/enfermeria');
            break;
          case Global.MEDICO:
            this.router.navigateByUrl('/medico');
            break;
          case Global.REPECION:
            this.router.navigateByUrl('/recepcion');
            break;
          case Global.FARMACIA:
            this.router.navigateByUrl('/farmacia');
            break;
        }
      })
    })
    .catch((err)=>{
      Swal.fire({
        icon:'error',
        title: 'Error al hacer login',
        text: err
      });
    })
  }
}
