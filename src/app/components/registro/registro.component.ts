import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { CognitoService } from 'src/app/service/cognito.service';
import { Router } from '@angular/router';
import { faLockOpen, faScroll, faCalendar, faLock, faUser, faEnvelope, faPerson, faVenusMars, faPhone, faUserDoctor, faPencil, faUserSlash, faLocation } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { SucursalService } from 'src/app/service/sucursal.service';
import { Global } from 'src/app/service/Global';
import { PerfilService } from 'src/app/service/perfil.service';
import { Sucursal } from 'src/app/models/sucursal';
import { Especialidad } from 'src/app/models/especialidad';

export interface Perfil{
  _id:string,
  nombre:string
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers:[UsuariosService,PerfilService, SucursalService]
})
export class RegistroComponent  implements OnInit{
  public usuario:IUser = new IUser('','','','','','','','','','','','M','','',false,'','','',false,'');
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
  public statusPwd = faLockOpen;
  public statusEmail = faLockOpen;
  public faLocation = faLocation;
  public usuarios:IUser[] = [];
  public perfil:Perfil = {} as Perfil;
  public faUserDoctor = faUserDoctor;
  public faPencil = faPencil;
  public faUserSlash = faUserSlash;
  public idPerfil: string = '';
  public idSucursal: string = '';
  public btnAccion: string = Global.REGISTRAR;
  public sucursales:Sucursal[] = [];
  perfiles: Perfil[] =[
    {_id:'1', nombre:'ADMINISTRADOR'},
    {_id:'2', nombre:'MEDICO'},
    {_id:'3', nombre:'RECEPCION'},
    {_id:'4', nombre:'ENFERMERA'},
  ];
  especialidades: Especialidad[] = [
    {_id:'1', descripcion:'Médico General'},
    {_id:'2', descripcion:'Cirugia General'},
    {_id:'3', descripcion:'Neurología'},
    {_id:'4', descripcion:'Neurocirugía'},
    {_id:'5', descripcion:'Ginecología y Obstetricia'},
    {_id:'6', descripcion:'Pediatría'},
    {_id:'7', descripcion:'Bariatría'},
    {_id:'8', descripcion:'Medicina Interna'},
    {_id:'9', descripcion:'Odontología'},
    {_id:'10', descripcion:'Psicología'},
    {_id:'11', descripcion:'Nutrición'}
  ]



  constructor(private router:Router, 
    private cognitoService:CognitoService,
    private usuariosService: UsuariosService,
    //private perfilService:PerfilService,
    private sucursaleService:SucursalService){
    this.isConfirm = false
  }
  ngOnInit(): void {
    //this.loadPerfiles();
    this.loadAllUsuarios();
    this.loadSucursales();
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

  loadSucursales():void{
    this.sucursaleService.getAllSucursales()
    .subscribe(res=>{
      if(res.status===Global.OK && res.body.sucursales.length > 0){
        this.sucursales = res.body.sucursales;
      }
    });
  }

  signUp():void{
    this.usuario.isAdmin = (this.perfil.nombre === Global.ADMINISTRADOR);
    let dob = this.usuario.dob;
    this.usuario.dob = dob.replace(/-/g,'/');
    this.usuario.cedula = this.usuario.cedula === undefined ? '' : this.usuario.cedula;
    this.usuario.especialidad = this.usuario.especialidad=== undefined ? '': this.usuario.especialidad;
    this.usuario.perfil = this.perfil.nombre;
    this.usuario.telefono = Global.COD_MX+this.usuario.telefono;
    this.cognitoService.signUp(this.usuario)
    .then(()=>{
      this.isConfirm = true;
    })
    .catch((err)=>{
      Swal.fire({
        icon:'error',
        title: 'Error al hacer el SignUp',
        text: err
      });
    })
  }

  confirmSignUp():void{
    this.cognitoService.confirmSignUp(this.usuario)
    .then(()=>{
      this.isConfirm = false;
      this.usuario = new IUser('','','','','','','','','','','','M','','',false,'','','',false,'');
      this.loadAllUsuarios();
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
    this.usuario.sexo = sexo;
  }

  validarEmail():void{
    if(this.usuario.email === this.usuario.repeatEmail){
      this.statusEmail = faLock;
    }else{
      this.statusEmail = faLockOpen
    }
  }

  validarPwd():void{
    if(this.usuario.password === this.usuario.repeatPassword){
      this.statusPwd = faLock;
    }else{
      this.statusPwd = faLockOpen
    }
  }

  isMedico():boolean{
    return this.perfil.nombre===Global.MEDICO;
  }

  editarUsuario(index:number):void{
    this.usuario = this.usuarios[index];
    this.usuario.dob = this.usuario.dob.replace('/','-').replace('/','-');
    //this.idPerfil = '1';
    this.btnAccion = Global.ACTUALIZAR;
  }

  borrarUsuario(index:number):void{
    let msgDisable = 'deshabilitar';
    let  msgResponse = 'deshabilitado';
    if(this.usuarios[index].isDisabled){
      msgDisable = 'habilitar';
      msgResponse = 'habilitado';
    }
    Swal.fire({
      title:'Esta seguro que desea '+msgDisable+' al usuario?',
      text: this.usuarios[index].nombre+' '+this.usuarios[index].apellidoP+' '+this.usuarios[index].apellidoM,
      showCancelButton:true,
      confirmButtonText:'Si'
    }).then(resultado=>{
      if(resultado.isConfirmed){
        const currentUserDisable = this.usuarios[index];
        currentUserDisable.isDisabled = !currentUserDisable.isDisabled;
        this.usuariosService.updateUsuario(currentUserDisable._id, currentUserDisable.email,currentUserDisable.isDisabled,currentUserDisable).subscribe((res)=>{
          if(res.status===Global.OK){
            Swal.fire({
              icon: 'success',
              title: 'El usuario se ha '+msgResponse+' exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.loadAllUsuarios();
          }
        });
      }
    })
  }

  limpiar():void{
    this.usuario = new IUser('','','','','','','','','','','','M','','',false,'','','',false,'');
  }
}
