import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/service/cognito.service';
import { IUser } from '../../models/user';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: IUser;

  constructor(private router: Router, private congnitoService: CognitoService){
    this.user = { } as IUser;
  }

  public signIn():void{
    this.congnitoService.signIn(this.user)
    .then(()=>{
      this.router.navigateByUrl('/recepcion')
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
