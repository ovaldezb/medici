import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { CognitoService } from 'src/app/service/cognito.service';
import { Router } from '@angular/router';
import { faSpinner, faLockOpen, faScroll, faCalendar, faLock, faUser, faEnvelope, faPerson, faVenusMars, faPhone, faUserDoctor, faPencil, faUserSlash, faLocation } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { SucursalService } from 'src/app/service/sucursal.service';
import { Global } from 'src/app/service/Global';
import { PerfilService } from 'src/app/service/perfil.service';
import { Sucursal } from 'src/app/models/sucursal';
import { Especialidad } from 'src/app/models/especialidad';
import { Perfil } from 'src/app/models/perfil';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers:[UsuariosService,PerfilService, SucursalService, PerfilService]
})
export class RegistroComponent  implements OnInit{
  public usuario:IUser = new IUser('','','','','','','','','','','','M','','',false,'','','',false,new Sucursal('','','','','','',false));
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
  public faSpinner = faSpinner;
  public usuarios:IUser[] = [];
  public perfil:Perfil = {} as Perfil;
  public faUserDoctor = faUserDoctor;
  public faPencil = faPencil;
  public faUserSlash = faUserSlash;
  public btnAccion: string = Global.REGISTRAR;
  public sucursales:Sucursal[] = [];
  public isWorkingIdentidad:boolean=false;
  perfiles:Perfil[]=[];
  
  especialidades: Especialidad[] = [
    {_id:'Médico General', descripcion:'Médico General'},
    {_id:'Cirugia General', descripcion:'Cirugia General'},
    {_id:'Neurología', descripcion:'Neurología'},
    {_id:'Neurocirugía', descripcion:'Neurocirugía'},
    {_id:'Ginecología y Obstetricia', descripcion:'Ginecología y Obstetricia'},
    {_id:'Pediatría', descripcion:'Pediatría'},
    {_id:'Bariatría', descripcion:'Bariatría'},
    {_id:'Medicina Interna', descripcion:'Medicina Interna'},
    {_id:'Odontología', descripcion:'Odontología'},
    {_id:'Psicología', descripcion:'Psicología'},
    {_id:'Nutrición', descripcion:'Nutrición'}
  ]



  constructor(private router:Router, 
    private cognitoService:CognitoService,
    private usuariosService: UsuariosService,
    private sucursaleService:SucursalService,
    private perfilesService: PerfilService){
    this.isConfirm = false
  }
  ngOnInit(): void {
    this.loadPerfiles();
    this.loadAllUsuarios();
    this.loadSucursales();
  }

  loadSucursales():void{
    this.sucursaleService.getAllSucursales()
    .subscribe(res=>{
      if(res.status===Global.OK && res.body.sucursales.length > 0){
        this.sucursales = res.body.sucursales;
      }
    });
  }

  loadPerfiles():void{
    this.perfilesService.getAllPerfiles()
    .subscribe(res=>{
      if(res.status===Global.OK){
        this.perfiles = res.body.perfiles;
      }
    });
  }

  signUp():void{
    this.usuario.isAdmin = (this.perfil.nombre === Global.ADMINISTRADOR);
    let dob = this.usuario.dob;
    this.usuario.dob = dob.replace(/-/g,'/');
    this.usuario.cedula = this.usuario.cedula === undefined ? '' : this.usuario.cedula;
    this.usuario.especialidad = this.usuario.especialidad=== undefined ? '': this.usuario.especialidad;
    this.usuario.perfil = this.perfil.valor;
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
    this.isWorkingIdentidad = true;
    this.cognitoService.confirmSignUp(this.usuario)
    .then(()=>{
      this.isConfirm = false;
      this.isWorkingIdentidad = false;
      this.usuario = new IUser('','','','','','','','','','','','M','','',false,'','','',false,new Sucursal('','','','','','',false));
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
    this.usuario = new IUser('','','','','','','','','','','','M','','',false,'','','',false,new Sucursal('','','','','','',false));
  }
}
