import { Component, OnInit, ViewChild } from '@angular/core';
import { DateRangeType, IgxCalendarComponent, IgxDialogComponent } from 'igniteui-angular';
import { Disponibilidad } from 'src/app/models/disponibilidad';
import { IUser } from 'src/app/models/user';
import { Global } from 'src/app/service/Global';
import { DisponibilidadService } from 'src/app/service/disponibilidad.service';
import { MedicosService } from 'src/app/service/medicos.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['./disponibilidad.component.css'],
  providers:[MedicosService,DisponibilidadService]
})
export class DisponibilidadComponent implements OnInit{

  constructor(private medicoService: MedicosService, private dispoService:DisponibilidadService){}
  public faTrashCan = faTrashCan;
  public medicos:IUser[] = [];
  public idMedico:string = '';
  public medico:IUser= {} as IUser;
  public listaDisponibilidad:Disponibilidad[]=[];
  public listaDisponibBorrar:Disponibilidad[]=[];
  public disponibilidad:Disponibilidad=new Disponibilidad('',{} as IUser,new Date(),'','');
  @ViewChild('calendar', { static: true })
  public calendar!: IgxCalendarComponent;
  //@ViewChild('alert', { static: true })
  //public dialog!: IgxDialogComponent;
  public range:Date[] =[];
  private mesActual = new Date();
  public isSavingDispo:boolean = false;

  ngOnInit(): void {
    this.medicoService.getAllMedicos().subscribe(res=>{
      if(res.status===Global.OK){
        this.medicos = res.body.medicos;
        this.idMedico = this.medicos[0]._id;
        this.medico = this.medicos[0];
        this.getDisponibilidadMedico();
      }
    });
  }

  getDisponibilidadMedico():void{
    this.isSavingDispo = true;
    this.listaDisponibilidad = [];
    this.mesActual.setDate(1);
    let mesSig = new Date(this.mesActual.getTime());
    mesSig.setMonth(this.mesActual.getMonth()+1);
    let mesIni = (this.mesActual.getMonth()+1) < 10 ? '0'+(this.mesActual.getMonth()+1) : (this.mesActual.getMonth()+1);
    let mesFin = (mesSig.getMonth()+1) < 10 ? '0'+(mesSig.getMonth()+1) : (mesSig.getMonth()+1);
    let fechaIni = this.mesActual.getFullYear()+'-'+mesIni+'-01';
    let fechaFin = mesSig.getFullYear()+'-'+mesFin+'-01';
    this.dispoService.getDisponibilidad(fechaIni,fechaFin,this.medico._id)
    .subscribe(res=>{
      this.isSavingDispo = false;
      if(res.status === Global.OK && res.body.disponibilidad.length > 0){
        res.body.disponibilidad.forEach((dispo: { _id: String; medico: IUser; dia: Date; horaInicio: string; horaFin: string; }) => {
          const fecha:Date = new Date(Date.parse(''+dispo.dia));
          this.listaDisponibilidad.push(new Disponibilidad(dispo._id,dispo.medico,fecha,dispo.horaInicio,dispo.horaFin))
        })
      }else{
        this.listaDisponibilidad = [];
      }
    });
  }
  
  cambiaMedico(event:any):void{
    this.medico = this.medicos[event.target["selectedIndex"]];
    this.getDisponibilidadMedico();
  }

  seleccionaRangoFechas(dates:Date|Date[]):void {
    this.range = dates as Date[];
  }

  cambiaCalendario(event:any):void{
    this.mesActual = event.currentValue;
    this.getDisponibilidadMedico();
  }

  eliminaDispo(index:number):void{
    if(this.listaDisponibilidad[index]._id != ''){
      this.listaDisponibBorrar.push(this.listaDisponibilidad[index]);
    }
    this.listaDisponibilidad.splice(index,1);
  }

  submitDisponibilidadDia():void{
    this.range.forEach(fechaDispniblidad=>{
      this.disponibilidad.dia = new Date(fechaDispniblidad);
      this.disponibilidad.medico = this.medico;
      this.listaDisponibilidad.push(new Disponibilidad(this.disponibilidad._id,this.disponibilidad.medico,this.disponibilidad.dia,this.disponibilidad.horaInicio,this.disponibilidad.horaFin));
    })
    
    this.listaDisponibilidad.sort((a,b)=>  {
      if(a.dia.getTime() < b.dia.getTime()) return -1;
      if(a.dia.getTime() > b.dia.getTime()) return 1;
      return 0;
    })
    console.log(this.listaDisponibilidad);
    this.range=[];
  }

  enviarDisponibilidad():void{
    this.isSavingDispo = true;
    let dispoSavedStatus = true;
    this.listaDisponibBorrar.forEach(disp=>{
      this.dispoService.deleteDisponibilidadById(disp._id)
      .subscribe(res=>{
        if(res.status === Global.OK){
          console.log(res.body);
        }
      })
    });
    this.listaDisponibBorrar = [];
    console.log(this.listaDisponibilidad);
    this.listaDisponibilidad.filter(disp=> disp._id==='')
    .forEach(dispo=>{
      this.dispoService.addDisponibilidad(dispo)
      .subscribe(res=>{
        this.isSavingDispo = false;
        if(res.status != Global.OK){
          dispoSavedStatus= false;
        }
      });
    });
    this.listaDisponibilidad = []; // se tiene que enviar a otra página o no elegir ningún médico para evitar duplicados 
    if(dispoSavedStatus){
      Swal.fire({
        text:'El/Los horarios de disponibilidad han sido guardado exitosamente',
        timer:Global.TIMER_OFF
      })
    }else{
      Swal.fire({
        text:'Uno o más de los horarios de disponibilidad no se guardó correctamente, revisa la lista',
        timer:Global.TIMER_OFF
      })
    }
    this.isSavingDispo = false;
  }
}
