import { Component, OnInit } from '@angular/core';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { Cita } from 'src/app/models/citas';
import { Medico } from 'src/app/models/medico';
import { Paciente } from 'src/app/models/paciente';
import { Signos } from 'src/app/models/signos';
import { CitasService } from 'src/app/service/citas.service';
import { Global } from 'src/app/service/Global';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
  providers:[CitasService]
})
export class MedicoComponent implements OnInit{
  
  public faUserDoctor = faUserDoctor;
  public fechaActual = new Date();
  public citas:Cita[] = [];
  public paciente: Paciente = new Paciente('','','',new Date(),'',0,'');
  public cita:Cita = new Cita('',new Paciente('','','',new Date(),'',0,''),new Medico('','',''),new Date(),'','',15,false, new Signos('1',new Paciente('','','',new Date(),'',0,''),0,0,0,0,new Date()));
  private dia:string = ''; 
  private mes:string = '';
  private year:string = '';
  private idMedico:string='6453042d49a5f0d4320c9f83';
  public HighlightRow:number=-1;
  

  constructor(private citasService:CitasService){}
  ngOnInit(): void {
    this.dia = this.fechaActual.getDate() < 10 ? '0'+this.fechaActual.getDate() : this.fechaActual.getDate()+'';
    this.mes = (this.fechaActual.getMonth() + 1) < 10 ? '0'+(this.fechaActual.getMonth() + 1)  : (this.fechaActual.getMonth() + 1)+'';
    this.year = this.fechaActual.getFullYear()+'';
    this.getCitas();
  }

  getCitas():void{
    this.citasService.getCitasByFechaAndMedico(this.year+'-'+this.mes+'-'+this.dia,this.idMedico).subscribe(res=>{
      if(res.status === Global.SUCCESS){
        this.citas = res.citas;
      }
    });
  }

  atenderPaciente(index:number):void{
    this.HighlightRow = index;
    this.cita = this.citas[index];
    this.paciente = this.cita.paciente;
  }

  finalizaConsulta():void{
    this.HighlightRow = -1;
  }

  
}