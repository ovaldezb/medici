import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { CognitoService } from 'src/app/service/cognito.service';
import { Router } from '@angular/router';
import { faLockOpen, faScroll, faCalendar, faLock, faUser, faEnvelope, faPerson, faVenusMars, faPhone, faUserDoctor, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { Global } from 'src/app/service/Global';
import { PerfilService } from 'src/app/service/perfil.service';
//import { Perfil } from 'src/app/models/perfil';

export interface Perfil{
  _id:string,
  nombre:string
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers:[UsuariosService,PerfilService]
})
export class RegistroComponent  implements OnInit{
  public user:IUser = {} as IUser;
  public isConfirm: boolean;
  public faCalendar = faCalendar;
  public faScroll = faScroll;
  public faUser = faUser;
  public faLock = faLock;
  public faEnvelope = faEnvelope;
  public faPerson = faPerson;
  public faVenusMars = faVenusMars;
  public faPhone = faPhone;
  public faLockOpen = faLockOpen;
  public statusIcon = faLockOpen;
  public usuarios:IUser[] = [];
  //public usuario:IUser = new IUser('','','','','','','','','','','M','','',false,'','','');
  //public perfiles:Perfil[] = [];
  public perfil:Perfil = {} as Perfil;
  public faUserDoctor = faUserDoctor;
  public faPencil = faPencil;
  public faTrashCan = faTrashCan;
  public idPerfil: string = '';
  perfiles: Perfil[] =[
    {_id:'1', nombre:'ADMINISTRADOR'},
    {_id:'2', nombre:'MEDICO'},
    {_id:'3', nombre:'RECEPCION'},
    {_id:'4', nombre:'ENFERMERA'},
  ];
  constructor(private router:Router, 
    private cognitoService:CognitoService,
    private usuariosService: UsuariosService,
    private perfilService:PerfilService){
    this.isConfirm = false
  }
  ngOnInit(): void {
    //this.loadPerfiles();
  }

  /*loadPerfiles():void{
    this.perfilService.getAllPerfiles()
    .subscribe(res=>{
      console.log(res);
      if(res.status === Global.OK){
        this.perfiles = res.body.perfiles;
        this.perfil = this.perfiles[0];
      }
    });
  }*/

  signUp():void{
    this.user.isAdmin = (this.perfil.nombre === Global.ADMINISTRADOR);
    let dob = this.user.dob;
    this.user.dob = dob.replace(/-/g,'/');
    this.user.cedula = this.user.cedula === undefined ? '' : this.user.cedula;
    this.user.especialidad = this.user.especialidad=== undefined ? '': this.user.especialidad;
    this.user.perfil = this.perfil.nombre;
    this.cognitoService.signUp(this.user)
    .then(()=>{
      this.isConfirm = true;
    })
    .catch((err)=>{
      console.log('Error al hacer el signUp');
      Swal.fire({
        icon:'error',
        title: 'Error al hacer el SignUp',
        text: err
      });
    })
  }

  confirmSignUp():void{
    this.cognitoService.confirmSignUp(this.user)
    .then(()=>{
      this.isConfirm = false;
      this.user = new IUser('','','','','','','','','','','M','','',false,'','','');
    })
    .catch((err)=>{
      console.log('Error al hacer el signUp',err);
    })
  }

  loadAllUsuarios():void{
    this.usuariosService.getAllUsuarios().subscribe((res)=>{
      if(res.status === Global.OK){
        this.usuarios = res.body.usuarios
      }
    })
  }

  perfilChange(event:any):void{
    this.perfil = this.perfiles[event.target["selectedIndex"]];
  }

  selectRow(index:number):void{

  }

  selectSex(sexo:string):void{
    this.user.sexo = sexo;
  }

  validar():void{
    if(this.user.password === this.user.repeatPassword){
      this.statusIcon = faLock;
    }else{
      this.statusIcon = faLockOpen
    }
  }

  isMedico():boolean{
    return this.perfil.nombre===Global.MEDICO;
  }

  borrarUsuario(index:number):void{
    Swal.fire({
      title:'Esta seguro que desea eliminar a éste Usuario? ',
      text: this.usuarios[index].nombre,
        showCancelButton:true,
        confirmButtonText:'Si'
    }).then(resultado=>{
      if(resultado.isConfirmed){
        this.usuariosService.deleteUsuario(this.usuarios[index]._id, this.usuarios[index].email).subscribe((res)=>{
          if(res.status===Global.OK){
            Swal.fire({
              icon: 'success',
              title: 'El médico se ha eliminado exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.loadAllUsuarios();
          }
        });
      }
    })
    
  }
}
