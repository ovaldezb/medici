import { Component } from '@angular/core';
import { faUser, faEnvelopeCircleCheck, faLock, faLockOpen, faCalculator, faL } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { CognitoService } from 'src/app/service/cognito.service';
import { Global } from 'src/app/service/Global';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent {

  public faUser = faUser;
  public user:IUser={} as IUser;
  public isSent:boolean = false;
  public confirmPassword:string='';
  public faEnvelopeCircleCheck = faEnvelopeCircleCheck;
  public faLock = faLock;
  public faLockShow = faLockOpen;
  public faCalculator = faCalculator;
  


  constructor(private router:Router, private cognitoService:CognitoService){}

  sendConfirmationEmail():void{
    this.cognitoService.forgotPassword(this.user.email)
    .then(res=>{
      if(res.CodeDeliveryDetails){
        this.isSent = true;
        Swal.fire({
          icon:'success',
          title:'Se ha enviado un código de verificación a tu correo',
          timer:1500
        });
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }

  forgotPasswordSubmit():void{
    this.cognitoService.forgotPasswordSubmit(this.user.email,this.user.code,this.user.password)
    .then(res=>{
      if(res===Global.SUCCESS){
        Swal.fire({
          icon:'success',
          title:'La contraseña se ha actualizado correctamente',
          text:'Felicidades!',
          timer:1500
        });
        this.user = {} as IUser;
        this.router.navigateByUrl('/login');
      }
    });
  }

  validatePwd():void{
    if(this.comparePwd()){
      this.faLockShow = faLock
    }else{
      this.faLockShow = faLockOpen;
    }
  }

  comparePwd():boolean{
    return this.user.password === this.confirmPassword;
  }

}
