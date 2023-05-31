import { Component, OnInit } from '@angular/core';
import { faCalendarCheck, 
  faUserNurse, 
  faUser, 
  faGears, 
  faUserDoctor, 
  faAlignLeft,
  faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/models/user';
import { Global } from 'src/app/service/Global';
import { CognitoService } from 'src/app/service/cognito.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public faCalendarCheck = faCalendarCheck;
  public faUserNurse = faUserNurse;
  public faUser = faUser;
  public faGears = faGears;
  public faUserDoctor = faUserDoctor;
  public faRightFromBracket = faRightFromBracket;
  public faAlignLeft = faAlignLeft;
  public status:boolean = false;
  public perfiles:Array<String>=new Array();

  
  constructor(private cognitoService:CognitoService){}
  
  public user:IUser = {} as IUser;
  public nombreUsuario:string='';
  ngOnInit(): void {
    if(this.cognitoService.isAuthenticated()){
      this.cognitoService.getUser()
      .then(user=>{
        this.nombreUsuario = user.attributes.given_name+' '+user.attributes.middle_name
        this.perfiles = user.signInUserSession.accessToken.payload['cognito:groups'];
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }

  isAuthenticated():boolean{
    return this.cognitoService.isAuthenticated();  
  }

  isAdmin():boolean{
    return this.perfiles.includes(Global.ADMINISTRADOR);
  }

  isMedico():boolean{
    return this.perfiles.includes(Global.MEDICO);
  }

  isRecepcion():boolean{
    return this.perfiles.includes(Global.REPECION);
  }

  isEnfermera():boolean{
    return this.perfiles.includes(Global.ENFERMERA);
  }
}
