import { Component, OnInit } from '@angular/core';
import { faCalendarPlus, faCircleXmark, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Cita } from 'src/app/models/citas';
import { Medico } from 'src/app/models/medico';
import { Paciente } from 'src/app/models/paciente';
import { Signos } from 'src/app/models/signos';
import { Global } from 'src/app/service/Global';
import { MedicosService } from 'src/app/service/medicos.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { CitasService } from 'src/app/service/citas.service';
import Swal from 'sweetalert2';

export interface Mes {
  value: string;
  viewValue: string;
}

export interface Duracion{
  value: number,
  viewValue: string
}

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css'],
  providers: [MedicosService, PacienteService,CitasService]
})

export class RecepcionComponent implements OnInit{

  public fechaActual: Date = new Date();
  public duracion : number = 15;
  public faCircleXmark = faCircleXmark;
  public faCalendarPlus = faCalendarPlus;
  public faPencil = faPencil;
  public faTrashCan = faTrashCan;
  public idMedico:string = '';
  public medicos:Medico[] = [];
  public paciente:Paciente = new Paciente('','','',new Date(),0,'');
  public cita:Cita = new Cita('',new Paciente('','','',new Date(),0,''),new Medico('','',''),new Date(),'','',15,false, new Signos('1',new Paciente('','','',new Date(),0,''),0,0,0,0,new Date()));
  public citas:Cita[] = [];
  public medico:Medico= new Medico('','','');
  public listaPacientesNombre:Paciente[] = [];
  public listaPacientesApellido:Paciente[] = [];
  public listaPacientesTelefono:Paciente[] = [];
  public dia:string='';
  public mes:string='01';
  public anio:string='';
  public fechaCita:string = new Date().toLocaleDateString('en-CA');//.split('T')[0];
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
  tiempoDuracion: Duracion[] = [
    { value:15, viewValue:'15 min' },
    { value:20, viewValue:'20 min' },
    { value:25, viewValue:'25 min' },
    { value:30, viewValue:'30 min' },
  ];
  constructor(private medicoService: MedicosService, 
              private pacienteService: PacienteService,
              private citasService: CitasService){

  }
  
  ngOnInit(): void {
    this.medicoService.getAllMedicos().subscribe(res=>{
      if(res.status===Global.SUCCESS){
        this.medicos = res.medicos;
        this.idMedico = this.medicos[0]._id;
        this.medico = this.medicos[0];
        this.getCitas();
      }
    });
  }

  cambiaMedico(event:any):void{
    this.medico = this.medicos[event.target["selectedIndex"]];
    this.getCitas();
  }

  buscaPacienteMatch(event:any, tipo:string):void{
    
    /*if (!(event.keyCode > 47 && event.keyCode < 58) && // numeric (0-9)
        !(event.keyCode > 64 && event.keyCode < 91) && // upper alpha (A-Z)
        !(event.keyCode > 96 && event.keyCode < 123)) { 
          this.listaPacientesNombre = [];// lower alpha (a-z)
        return;
    }*/
    if(tipo==='nombre'){
      if((event.keyCode===8 || event.keyCode===13 ) && this.paciente.nombre.length===0) {
        this.listaPacientesNombre = [];
        return;
      }
      this.pacienteService.findPacienteByNombre(this.paciente.nombre).subscribe(res=>{
        if(res.status===Global.SUCCESS){
          if(res.pacientes.length > 0){
            this.listaPacientesNombre = res.pacientes;
          }else{
            this.listaPacientesNombre = [];
          }
        }
      });
    }else if(tipo === 'apellido'){
      if((event.keyCode===8 || event.keyCode===13 ) && this.paciente.apellido.length===0) {
        this.listaPacientesApellido = [];
        return;
      }
      this.pacienteService.findPacienteByApellido(this.paciente.apellido).subscribe(res=>{
        if(res.status===Global.SUCCESS){
          if(res.pacientes.length > 0){
            this.listaPacientesApellido = res.pacientes;
          }else{
            this.listaPacientesApellido = [];
          }
        }
      });
    }else if(tipo === 'telefono'){
      if((event.keyCode===8 || event.keyCode===13 ) && this.paciente.telefono.length===0) {
        this.listaPacientesTelefono = [];
        return;
      }
      this.pacienteService.findPacienteByTelefono(this.paciente.telefono).subscribe(res=>{
        if(res.status===Global.SUCCESS){
          if(res.pacientes.length > 0){
            this.listaPacientesTelefono = res.pacientes;
          }else{
            this.listaPacientesTelefono = [];
          }
        }
      });
    }
  }

  selectedRow(index:number):void{
    this.paciente = this.listaPacientesNombre[index];
    var fechaNacimiento = new Date(new Date(this.paciente.fechaNacimiento).toLocaleString("en-US",{timeZone:"Etc/GMT"}));
    this.anio = fechaNacimiento.getFullYear().toString();
    this.dia = fechaNacimiento.getDate().toString();
    this.mes = (fechaNacimiento.getMonth()+1) < 10 ? '0'+(fechaNacimiento.getMonth()+1) : ''+(fechaNacimiento.getMonth()+1);
    this.listaPacientesNombre = [];
  }

  isValidSpot():boolean{
    return this.citas.map(cita=>{
      return {
        fechaCitaIni:new Date(new Date(cita.fechaCita).toISOString().split('T')[0]+' '+cita.horaCita),
        fechaCitaFin:new Date(new Date(new Date(cita.fechaCita).toISOString().split('T')[0]+' '+cita.horaCita).getTime() + this.cita.duracion*60000)
      }
      })
      .every(citaMod =>{
      let fechaCitaActualIni = new Date(this.fechaCita+ ' '+this.cita.horaCita);
      let fechaCitaActualFin = new Date(fechaCitaActualIni.getTime() + this.duracion * 60000)
      
      if((fechaCitaActualIni > citaMod.fechaCitaIni && fechaCitaActualIni < citaMod.fechaCitaFin) || (fechaCitaActualFin >= citaMod.fechaCitaIni && fechaCitaActualFin < citaMod.fechaCitaFin)){
        return false;
      }
      return true;
    });
  }

  agendar():void{
    if(!this.isValidSpot()){
      Swal.fire({
        icon:'warning',
        title:'Horario no disponible',
        text:'Revise el calendario, el horario de ésta cita se empalma con una ya existente'
      });
      return;
    }
    Swal.fire({
      title:'Desea agendar ésta Cita?',
        showCancelButton:true,
        confirmButtonText:'OK'
    }).then(resultado=>{
      if(resultado.isConfirmed){
        let fechaCitaArray = this.fechaCita.split('-');
        this.cita.duracion = this.duracion;
        this.cita.fechaCita = new Date(Number(fechaCitaArray[0]),(Number(fechaCitaArray[1])-1),Number(fechaCitaArray[2]));
        this.paciente.fechaNacimiento = new Date(new Date(this.anio+'-'+this.mes+'-'+this.dia).toLocaleString("en-US",{timeZone:"Etc/GMT"}));
        if(this.paciente._id===''){ //es nuevo
          this.pacienteService.addPaciente(this.paciente).subscribe(res=>{
            if(res.status===Global.SUCCESS){
              this.cita.paciente = res.paciente;
              this.cita.medico = this.medico;
              this.citasService.addCita(this.cita).subscribe(resCita=>{
                if(resCita.status===Global.SUCCESS){
                  this.citaExitosa();
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: 'La Cita no se pudo generar '+resCita.message,
                    showConfirmButton: true,
                    timer: 1500
                  });
                }
              });
            }
          });
        }else{
          this.cita.paciente = this.paciente;
          this.cita.medico = this.medico;
          this.citasService.addCita(this.cita).subscribe(res=>{
            if(res.status===Global.SUCCESS){
              this.citaExitosa();
            }
          });
        }
      }
    });
  }

  getCitas():any{
    this.citasService.getCitasByFechaAndMedico(this.fechaCita,this.idMedico).subscribe(res=>{
      if(res.status === Global.SUCCESS){
        this.citas = res.citas;
        //this.isValidSpot();
      }
    });
  }

  editarCita(index:number):any{

  }

  borrarCita(index:number):any{

  }

  cambiaFecha():any{
    this.getCitas();
  }

  cerrarNombre():any{
    this.listaPacientesNombre = [];
  }

  cerrarApellido():any{
    this.listaPacientesApellido =[];
  }

  cerrarTelefono():any{
    this.listaPacientesTelefono = [];
  }

  limpiar():void{
    this.paciente = new Paciente('','','',new Date(),0,'');
    this.anio = '';
    this.mes = '01';
    this.dia = '';
  }

  citaExitosa():void{
    this.getCitas();
    Swal.fire({
      icon: 'success',
      title: 'La Cita se ha agendado exitosamente',
      showConfirmButton: true,
      timer: 1500
    });
    this.paciente = new Paciente('','','',new Date(),0,'');
    this.cita = new Cita('',this.paciente,new Medico('','',''),new Date(),'','',15, false,new Signos('',new Paciente('','','',new Date(),0,''),0,0,0,0,new Date()));
    this.fechaCita = new Date().toISOString().split('T')[0];
    this.dia = '';
    this.mes = '01';
    this.anio = '';
  }

}
