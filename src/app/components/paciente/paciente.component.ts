import { Component } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { Global } from 'src/app/service/Global';
import { PacienteService } from 'src/app/service/paciente.service';
import Swal from 'sweetalert2';

export interface Mes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  providers:[PacienteService]
})
export class PacienteComponent {

  public paciente : Paciente = new Paciente('','','','',new Date(),'M','','','','');
  public dia:string='';
  public mes:string='01';
  public anio:string='';
  public nombrePaciente:string='';
  public apellidoPaterno:string='';
  public btnAccion:string=Global.ALTA;
  public listaPacientes:Paciente[] = [];


  meses: Mes[] = [
    {value: '01', viewValue: 'Enero'},
    {value: '02', viewValue: 'Febrero'},
    {value: '03', viewValue: 'Marzo'},
    {value: '04', viewValue: 'Abril'},
    {value: '05', viewValue: 'Mayo'},
    {value: '06', viewValue: 'Junio'},
    {value: '07', viewValue: 'Julio'},
    {value: '08', viewValue: 'Agosto'},
    {value: '09', viewValue: 'Septiembre'},
    {value: '10', viewValue: 'Octubre'},
    {value: '11', viewValue: 'Noviembre'},
    {value: '12', viewValue: 'Diciembre'}
  ];

  constructor(private pacienteService:PacienteService){}

  buscarPacienteNombre(event:any):void{
    if((event.keyCode===8 || event.keyCode===13 ) && this.paciente.nombre.length===0) {
      this.listaPacientes = [];
      return;
    }
    if(this.nombrePaciente !='' && this.nombrePaciente.length >=3){
      this.pacienteService.findPacienteByNombre(this.nombrePaciente)
      .subscribe(res=>{
        if(res.status === Global.OK && res.body.pacientes.length >0){
          this.listaPacientes = res.body.pacientes;
          this.nombrePaciente = '';
        }
      });
    }
  }

  buscaPacienteApellido(event:any):void{
    if((event.keyCode===8 || event.keyCode===13 ) && this.paciente.nombre.length===0) {
      this.listaPacientes = [];
      return;
    }
    if(this.apellidoPaterno !='' && this.apellidoPaterno.length >=3){
      this.pacienteService.findPacienteByApellido(this.apellidoPaterno)
      .subscribe(res=>{
        if(res.status === Global.OK && res.body.pacientes.length >0){
          this.listaPacientes = res.body.pacientes;
          this.apellidoPaterno = '';
        }
      });
    }
  }

  selectPacienteNombre(index:number):void{
    this.paciente = new Paciente('','','','',new Date(),'M','','','','');
    this.paciente = this.listaPacientes[index];
    this.calculaFechaNacimiento();
    this.listaPacientes =[];
    this.btnAccion = Global.ACTUALIZAR;
  }

  limpiar():void{
    this.paciente = new Paciente('','','','',new Date(),'M','','','','');
    this.dia='';
    this.mes = '01';
    this.anio = '';
    this.btnAccion = Global.ALTA;
  }

  altaUpdatePaciente():void{
    if(this.validaFechaNacimiento()){
      Swal.fire({
        icon:'warning',
        title:'La fecha de nacimiento no es válida',
        text: 'Dia:'+this.dia+' Mes:'+this.mes+' Año:'+this.anio
      });
      return;
    }
    if(this.btnAccion === Global.ALTA){
      this.altaPaciente();
    }else{
      this.updatePaciente();
    }
  }

  altaPaciente():void{
    Swal.fire({
      title:'Desea agregar al paciente?',
      showCancelButton:true,
      cancelButtonText:Global.NO,
      confirmButtonText: Global.SI
    })
    .then(resultado=>{
      if(resultado.isConfirmed){
        this.paciente.fechaNacimiento = new Date(new Date(this.anio+'-'+this.mes+'-'+this.dia).toLocaleString("en-US",{timeZone:"Etc/GMT"}));
        this.pacienteService.addPaciente(this.paciente)
        .subscribe(res=>{
          if(res.status===Global.OK){
            Swal.fire({
              title:'El paciente se ha agregado exitosamente',
              icon:'success',
              timer:Global.TIMER_OFF
            });
            this.limpiar();
          }
        })
      }
    });
  }

  updatePaciente():void{
    Swal.fire({
      title:'Desea actualizar éste paciente?',
      showCancelButton:true,
      cancelButtonText:Global.NO,
      confirmButtonText: Global.SI
    })
    .then(resultado=>{
      if(resultado.isConfirmed){
        this.paciente.fechaNacimiento = new Date(new Date(this.anio+'-'+this.mes+'-'+this.dia).toLocaleString("en-US",{timeZone:"Etc/GMT"}));
        this.pacienteService.updatePaciente(this.paciente._id, this.paciente)
        .subscribe(res=>{
          if(res.status===Global.OK){
            Swal.fire({
              title:'El paciente se ha actualizado exitosamente',
              icon:'success',
              timer:Global.TIMER_OFF
            });
          }
          this.limpiar();
        });
      }
    });
  }

  calculaFechaNacimiento():void{
    var fechaNacimiento = new Date(new Date(this.paciente.fechaNacimiento).toLocaleString("en-US",{timeZone:"Etc/GMT"}));
    this.anio = fechaNacimiento.getFullYear().toString();
    this.dia = fechaNacimiento.getDate().toString();
    this.mes = (fechaNacimiento.getMonth()+1) < 10 ? '0'+(fechaNacimiento.getMonth()+1) : ''+(fechaNacimiento.getMonth()+1);
  }

  validaFechaNacimiento():boolean{
    const fechaValida = Date.parse(this.anio+'-'+this.mes+'-'+this.dia);
    return isNaN(fechaValida);
  }
}
