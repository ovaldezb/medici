import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faCalendarPlus, faCircleXmark, faPencil, faTrashCan, faArrowRight, faArrowLeft, faL } from '@fortawesome/free-solid-svg-icons';
import { Cita } from 'src/app/models/citas';
import { Paciente } from 'src/app/models/paciente';
import { Signos } from 'src/app/models/signos';
import { Global } from 'src/app/service/Global';
import { MedicosService } from 'src/app/service/medicos.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { CitasService } from 'src/app/service/citas.service';
import Swal from 'sweetalert2';
import { IUser } from 'src/app/models/user';
import { CarnetService } from 'src/app/service/carnet.service';
import { Carnet } from 'src/app/models/carnet';
import { DisponibilidadService } from 'src/app/service/disponibilidad.service';
import { Disponibilidad } from 'src/app/models/disponibilidad';

export interface Mes {
  value: string;
  viewValue: string;
}

export interface Duracion{
  value: number,
  viewValue: string
}

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  providers: [MedicosService, PacienteService,CitasService, CarnetService, DisponibilidadService]
})
export class CitasComponent implements OnInit{
  public fechaActual: Date = new Date();
  public duracion : number = 20;
  public faCircleXmark = faCircleXmark;
  public faCalendarPlus = faCalendarPlus;
  public faArrowRight = faArrowRight;
  public faArrowLeft = faArrowLeft;
  public faPencil = faPencil;
  public faTrashCan = faTrashCan;
  public higlightIndex = -1;
  public idMedico:string = '';
  public medicos:IUser[] = [];
  public paciente:Paciente = new Paciente('','','','',new Date(),'','','','','');
  public cita:Cita = new Cita('',new Paciente('','','','',new Date(),'','','','',''),new IUser('','','','','','','','','','','','','','',false,'','','',false,''),new Date(),'','',15,false, []);
  public citas:Cita[] = [];
  public carnet : Carnet = new Carnet('','',new Date(),0,[],[]);
  public medico:IUser= {} as IUser;
  public listaPacientesNombre:Paciente[] = [];
  public listaPacientesApellido:Paciente[] = [];
  public listaPacientesTelefono:Paciente[] = [];
  public listaPacientesCarnet:Paciente[] = [];
  public btnAccion:string = Global.AGENDAR;
  public dia:string='';
  public mes:string='01';
  public anio:string='';
  public fechaCita:string = new Date().toLocaleDateString('en-CA');//.split('T')[0];
  public isLoadingCarnet : boolean = false;
  public listaDispoMedico:Disponibilidad[]=[];
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
    { value:20, viewValue:'20 min' }
  ];
  constructor(private medicoService: MedicosService, 
              private pacienteService: PacienteService,
              private citasService: CitasService,
              private carnetService:CarnetService,
              private disponibilidadService: DisponibilidadService){}

  ngOnInit(): void {
    this.medicoService.getAllMedicos().subscribe(res=>{
      if(res.status===Global.OK){
        this.medicos = res.body.medicos;
        this.idMedico = this.medicos[0]._id;
        this.medico = this.medicos[0];
        this.getCitas();
        this.getHorariosMedico();
      }
    });
    
  }

  getHorariosMedico():void{
    let mesActual = (this.fechaActual.getMonth()+1) < 10 ? '0'+(this.fechaActual.getMonth()+1):(this.fechaActual.getMonth()+1)
    let fechaActualTemporal = new Date(this.fechaActual.getTime());
    let diasSig = new Date(fechaActualTemporal.setDate(fechaActualTemporal.getDate()+1));
    console.log(diasSig);
    let mesSig = (diasSig.getMonth()+1) <10 ? '0'+(diasSig.getMonth()+1) : (diasSig.getMonth()+1);
    this.disponibilidadService.getDisponibilidad(this.fechaActual.getFullYear()+'-'+mesActual+'-'+this.fechaActual.getDate(),diasSig.getFullYear()+'-'+mesSig+'-'+diasSig.getDate(),this.idMedico)
    .subscribe(res=>{
      this.listaDispoMedico = [];
      if(res.status === Global.OK){
        res.body.disponibilidad.forEach((dispo: { _id: String; medico: IUser; dia: Date; horaInicio: string; horaFin: string; }) => {
          const fecha:Date = new Date(Date.parse(''+dispo.dia));
          this.listaDispoMedico.push(new Disponibilidad(dispo._id,dispo.medico,fecha,dispo.horaInicio,dispo.horaFin))
        })
      }
    })
  }

  cambiaMedico(event:any):void{
    this.medico = this.medicos[event.target["selectedIndex"]];
    this.getCitas();
    this.getHorariosMedico();
  }

  buscaPacienteMatch(event:any, tipo:string):void{
    
    /*if (!(event.keyCode > 47 && event.keyCode < 58) && // numeric (0-9)
        !(event.keyCode > 64 && event.keyCode < 91) && // upper alpha (A-Z)
        !(event.keyCode > 96 && event.keyCode < 123)) { 
          this.listaPacientesNombre = [];// lower alpha (a-z)
        return;
    }*/
    if(tipo===Global.NOMBRE){
      if((event.keyCode===8 || event.keyCode===13 ) && this.paciente.nombre.length===0) {
        this.listaPacientesNombre = [];
        return;
      }
      this.pacienteService.findPacienteByNombre(this.paciente.nombre)
      .subscribe(res=>{
        if(res.status===Global.OK && res.body.pacientes != undefined && res.body.pacientes.length > 0){
          this.listaPacientesNombre = res.body.pacientes;
        }else{
          this.listaPacientesNombre = [];
        }
      });
    }else if(tipo === Global.APELLIDO){
      if((event.keyCode===8 || event.keyCode===13 ) && this.paciente.apellidoP.length===0) {
        this.listaPacientesApellido = [];
        return;
      }
      this.pacienteService.findPacienteByApellido(this.paciente.apellidoP).subscribe(res=>{
        if(res.status===Global.OK){
          if(res.body.pacientes.length > 0){
            this.listaPacientesApellido = res.body.pacientes;
          }else{
            this.listaPacientesApellido = [];
          }
        }
      });
    }else if(tipo === Global.TELEFONO){
      if((event.keyCode===8 || event.keyCode===13 ) && this.paciente.telefono.length===0) {
        this.listaPacientesTelefono = [];
        return;
      }
      this.pacienteService.findPacienteByTelefono(this.paciente.telefono).subscribe(res=>{
        if(res.status===Global.OK){
          if(res.body.pacientes.length > 0){
            this.listaPacientesTelefono = res.body.pacientes;
          }else{
            this.listaPacientesTelefono = [];
          }
        }
      });
    }
  }

  buscaFolio(event:any):void{
    if(event.keyCode === 13){
      this.isLoadingCarnet = true;
      this.carnetService.getCarnetByFolio(this.paciente.carnet)
      .subscribe(res=>{
        this.isLoadingCarnet = false;
        if(res.status===Global.OK && res.body.carnet.length > 0 ){
          this.carnet = res.body.carnet[0];
          this.listaPacientesCarnet = res.body.carnet[0].pacientes;
        }else{
          Swal.fire({
            text:'No se encontró información para el folio:'+this.paciente.carnet,
            timer:Global.TIMER_OFF
          });
        }
      });
    }
  }

  closeModal():void{
    this.listaPacientesCarnet = [];
  }

  selectedRow(index:number):void{
    if(this.listaPacientesNombre.length > 0){
      this.paciente = this.listaPacientesNombre[index];
    }else if(this.listaPacientesApellido.length > 0){
      this.paciente = this.listaPacientesApellido[index];
    }else if(this.listaPacientesTelefono.length >0){
      this.paciente = this.listaPacientesTelefono[index];
    }
    if(this.paciente.carnet != '' && this.paciente.carnet != undefined){
      this.obtieneCarnet();
    }
    this.calculaFechaNacimiento();
    this.listaPacientesNombre = [];
    this.listaPacientesApellido = [];
    this.listaPacientesTelefono = [];
  }

  obtieneCarnet():void{
    this.carnetService.getCarnetByFolio(this.paciente.carnet)
    .subscribe(res=>{
      if(res.status === Global.OK){
        this.carnet = res.body.carnet[0];
      }
    });
  }

  calculaFechaNacimiento():void{
    var fechaNacimiento = new Date(new Date(this.paciente.fechaNacimiento).toLocaleString("en-US",{timeZone:"Etc/GMT"}));
    this.anio = fechaNacimiento.getFullYear().toString();
    this.dia = fechaNacimiento.getDate().toString();
    this.mes = (fechaNacimiento.getMonth()+1) < 10 ? '0'+(fechaNacimiento.getMonth()+1) : ''+(fechaNacimiento.getMonth()+1);
  }

  isValidSpot():boolean{
    if(this.citas === undefined) return true;
    return this.citas.map(cita=>{
      return {
        fechaCitaIni:new Date(new Date(cita.fechaCita).toISOString().split('T')[0]+' '+cita.horaCita),
        fechaCitaFin:new Date(new Date(new Date(cita.fechaCita).toISOString().split('T')[0]+' '+cita.horaCita).getTime() + this.cita.duracion*60000)
      }
      })
      .every(citaMod =>{
        let fechaCitaActualIni = new Date(this.fechaCita+ ' '+this.cita.horaCita);
        let fechaCitaActualFin = new Date(fechaCitaActualIni.getTime() + this.duracion * 60000)
        if((fechaCitaActualIni >= citaMod.fechaCitaIni && fechaCitaActualIni < citaMod.fechaCitaFin) || 
         (fechaCitaActualFin > citaMod.fechaCitaIni && fechaCitaActualFin <= citaMod.fechaCitaFin))
        {
          return false;
        }
        return true;
    });
  }

  isMedicoDisponible():boolean{
    return this.listaDispoMedico.map(horarioDisp=>{
      return {
        horaDispIni:new Date(new Date(horarioDisp.dia).toISOString().split('T')[0]+' '+horarioDisp.horaInicio),
        horaDispFin:new Date(new Date(horarioDisp.dia).toISOString().split('T')[0]+' '+horarioDisp.horaFin),
      }
    })
    .every(horarioDisp => {
      let fechaCitaActualIni = new Date(this.fechaCita+ ' '+this.cita.horaCita);
      let fechaCitaActualFin = new Date(fechaCitaActualIni.getTime() + this.duracion * 60000);
      console.log('FechaCitaActualIni',fechaCitaActualIni);
      console.log('FechaCitaActualFin',fechaCitaActualFin);
      console.log('horarioDisp.horaDispIni',horarioDisp.horaDispIni);
      console.log('horarioDisp.horaDispFin',horarioDisp.horaDispFin);
      console.log('1',fechaCitaActualFin > horarioDisp.horaDispIni);
      console.log('2',fechaCitaActualFin <= horarioDisp.horaDispFin)
      if((fechaCitaActualIni >= horarioDisp.horaDispIni && fechaCitaActualIni < horarioDisp.horaDispFin) && 
      (fechaCitaActualFin > horarioDisp.horaDispIni && fechaCitaActualFin <= horarioDisp.horaDispFin))
     {
       return false;
     }
     return true;
    });
  }

  addUpdate():void{
    if(this.validaFechaNacimiento()){
      Swal.fire({
        icon:'warning',
        title:'La fecha de nacimiento no es válida',
        text: 'dia:'+this.dia+' mes:'+this.mes+' año:'+this.anio
      });
      return;
    }
    if(this.validaFechaCita()){
      Swal.fire({
        icon:'error',
        title:'Fecha no disponible',
        text:'No se pueden agendar una cita para fecha/hora menor a la fecha/hora actual'
      });
      return;
    }
    if(this.isMedicoDisponible()){
      Swal.fire({
        icon:'warning',
        title:'El horario de la cita está fuera del horario de servicio del médico',
        text:'Revise el calendario del Médico'
      });
      return;
    }
    if(!this.isValidSpot()){
      Swal.fire({
        icon:'warning',
        title:'Horario no disponible',
        text:'Revise el calendario, el horario de ésta cita se empalma con una ya existente'
      });
      return;
    }

    if(this.btnAccion === Global.AGENDAR){
      this.agendarCita();
    }else{
      this.updateCita();
    }
  }

  agendarCita():void{
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
          this.pacienteService.addPaciente(this.paciente)
          .subscribe(res=>{
            if(res.status===Global.OK){
              this.cita.paciente = res.body.paciente;
              this.cita.medico = this.medico;
              this.citasService.addCita(this.cita)
              .subscribe(resCita=>{
                if(resCita.status===Global.OK){
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
            if(res.status===Global.OK){
              if(this.paciente.carnet != '' && this.paciente.carnet != undefined){
                this.modificaCarnetCitas(this.paciente.carnet,Global.MENOSUNO);
                this.carnet.citas.push(res.body.cita._id);
                this.carnetService.updateCarnet(this.carnet._id,this.carnet)
                .subscribe(res1=>{
                  //console.log(res1);
                });
              }
              this.citaExitosa();
            }
          });
        }
      }
    });
  }

  modificaCarnetCitas(folio:string, amount:number):void{
    this.carnetService.updateCitasCarnet(folio,amount)
    .subscribe(res=>{
      console.log('Se disminuyó el número de citas disponibles');
    });
  }

  updateCita():any{
    Swal.fire({
      title:'Desea actualizar ésta Cita?',
      showCancelButton:true,
      confirmButtonText:'OK'
    })
    .then(resultado =>{
      if(resultado.isConfirmed){
        this.citasService.updateCita(this.cita._id,this.cita).subscribe(res=>{
          if(res.status === Global.OK){
            Swal.fire({
              icon:'success',
              text: 'La cita se actualizó correctamente',
              timer: 1500
            });
            this.limpiar();
          }
        });
      }
    });
  }

  getCitas():any{
    
    this.citasService.getCitasByFechaAndMedico(this.fechaCita,this.idMedico).subscribe(res=>{
      if(res.body.citas != undefined){
        this.citas = res.body.citas;
      }
    });
  }

  editarCita(index:number):any{
    this.cita = this.citas[index];
    this.paciente = this.cita.paciente;
    this.calculaFechaNacimiento();
    this.btnAccion = Global.ACTUALIZAR;
  }

  borrarCita(index:number):any{
    Swal.fire({
      title:'Desea eliminar ésta Cita?',
      text:'En caso de que el paciente esté asociado a un carnet, ésta consulta no se descontará',
      showCancelButton:true,
      confirmButtonText:'OK'
    }).then(resultado=>{
      if(resultado.isConfirmed){
        this.citasService.deleteCita(this.citas[index]._id).subscribe(res=>{
          if(res.status === Global.OK){
            if(this.citas[index].paciente.carnet != null && this.citas[index].paciente.carnet != undefined){
              this.modificaCarnetCitas(this.citas[index].paciente.carnet,Global.UNO);
            }
            Swal.fire({
              icon:'success',
              text: 'La cita se eliminó exitosamente',
              timer: 1500
            });
            this.getCitas();
          }
        });
      }
    });
  }

  validaFechaNacimiento():boolean{
    const fechaValida = Date.parse(this.anio+'-'+this.mes+'-'+this.dia);
    return isNaN(fechaValida);
  }

  cambiaFecha():any{
    this.fechaActual = new Date(this.fechaCita+' 00:00:00');
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
    this.btnAccion = Global.AGENDAR;
    this.paciente = new Paciente('','','','',new Date(),'','','','','');
    this.cita = new Cita('',this.paciente,new IUser('','','','','','','','','','','','','','',false,'','','',false,''),new Date(),'','',15, false,[]);
    this.fechaCita = new Date().toISOString().split('T')[0];
    this.dia = '';
    this.mes = '01';
    this.anio = '';
    this.carnet = new Carnet('','',new Date(),0,[],[]);
  }

  citaExitosa():void{
    this.getCitas();
    Swal.fire({
      icon: 'success',
      title: 'La Cita se ha agendado exitosamente',
      showConfirmButton: true,
      timer: 1500
    });
    this.limpiar();
  }

  minusDay():void{
    let dateTmp = new Date(this.fechaCita+' 00:00:00');
    let minusDay = new Date(dateTmp.getTime());
    minusDay.setDate(minusDay.getDate() - 1);
    let month = (minusDay.getMonth()+1) < 10 ? ('0'+(minusDay.getMonth()+1)) : (minusDay.getMonth()+1);
    let day = minusDay.getDate() < 10 ? ('0'+minusDay.getDate()) : minusDay.getDate();
    this.fechaCita = minusDay.getFullYear()+'-'+month+'-'+day;
    this.fechaActual = new Date(this.fechaCita+' 00:00:00');
    this.getCitas();
  }

  plusDay():void{
    let dateTmp = new Date(this.fechaCita+' 00:00:00');
    let plusDay = new Date(dateTmp.getTime());
    plusDay.setDate(plusDay.getDate() + 1);
    let month = (plusDay.getMonth()+1) < 10 ? ('0'+(plusDay.getMonth()+1)) : (plusDay.getMonth()+1);
    let day = plusDay.getDate() < 10 ? ('0'+plusDay.getDate()) : plusDay.getDate();
    this.fechaCita = plusDay.getFullYear()+'-'+month+'-'+day;
    this.fechaActual = new Date(this.fechaCita+' 00:00:00');
    this.getCitas();
  }

  validaFechaCita():boolean{
    let fechaHoy = new Date();
    let fehaCitaTentativa = new Date(this.fechaCita+' '+this.cita.horaCita);
    if(fechaHoy.getTime() >= fehaCitaTentativa.getTime()){
      return true; //la fecha de la cita es menor a la fecha eactual, no se puede agendar una cita
    }
    return false;
  }

  seleccionarPaciente():void{
    this.paciente = this.carnet.pacientes[this.higlightIndex];
    this.calculaFechaNacimiento();
    this.closeModal();
  }

  selectRow(index:number):void{
    this.higlightIndex = index;
  }

}
