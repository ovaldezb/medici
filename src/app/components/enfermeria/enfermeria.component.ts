import { Component, OnInit } from '@angular/core';
import { faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { CitasService } from 'src/app/service/citas.service';
import { SignosService} from 'src/app/service/signos.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { Global } from 'src/app/service/Global';
import { Cita } from 'src/app/models/citas';
import { Paciente } from 'src/app/models/paciente';
import { Medico } from 'src/app/models/medico';
import { Signos } from 'src/app/models/signos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enfermeria',
  templateUrl: './enfermeria.component.html',
  styleUrls: ['./enfermeria.component.css'],
  providers: [CitasService, SignosService, PacienteService]

})
export class EnfermeriaComponent implements OnInit{
  
  public btnAccion: string = Global.GUARDAR;
  public HighlightRow:number = -1;
  public faUserNurse = faUserNurse;
  public fechaActual = new Date();
  public citas:Cita[] = [];
  public cita:Cita = new Cita('',new Paciente('','','',new Date(),'',0,''),new Medico('','',''),new Date(),'','',15,false,new Signos('',new Paciente('','','',new Date(),'',0,''),0,0,0,0,new Date()));
  public paciente:Paciente = new Paciente('','','',new Date(),'',0,'');
  public medico:Medico = new Medico('','','');
  public signos: Signos = new Signos('',new Paciente('','','',new Date(),'',0,''),0,0,0,0,new Date());
  private dia:string = ''; 
  private mes:string = '';
  private year:string = '';
  constructor(
    private citasService:CitasService, 
    private signosService:SignosService, 
    private pacienteService: PacienteService){}

  ngOnInit(): void {
    this.dia = this.fechaActual.getDate() < 10 ? '0'+this.fechaActual.getDate() : this.fechaActual.getDate()+'';
    this.mes = (this.fechaActual.getMonth() + 1) < 10 ? '0'+(this.fechaActual.getMonth() + 1)  : (this.fechaActual.getMonth() + 1)+'';
    this.year = this.fechaActual.getFullYear()+'';
    this.getCitas();
  }

  getCitas():any{
    this.citasService.getCitasByFecha(this.year+'-'+this.mes+'-'+this.dia).subscribe(res=>{
      if(res.status === Global.OK){
        this.citas = res.body.citas;
      }
    });
  }

  guardaSignos():void{
    if(this.btnAccion === Global.GUARDAR){
      Swal.fire({
        title:'Desea guardar estos Signos?',
        html:'<table>'+
                '<tr><td style="text-align:right;">Temperatura:</td><td style="text-align:left;">&nbsp;'+this.signos.temperatura+'ºC</td></tr>'+
                '<tr><td style="text-align:right;">Estatura:</td><td style="text-align:left;">&nbsp;'+this.paciente.estatura+'m</td></tr>'+
                '<tr><td style="text-align:right;">Peso:</td><td style="text-align:left;">&nbsp;'+this.signos.peso+'Kg</td></tr>'+
                '<tr><td style="text-align:right;">Cistólica:</td><td style="text-align:left;">&nbsp;'+this.signos.presionCis+'</td></tr>'+
                '<tr><td style="text-align:right;">Diastólica:</td><td style="text-align:left;">&nbsp;'+this.signos.presionDias+'</td></tr>'+  
              '</table>',
        showCancelButton:true,
        confirmButtonText:'OK'
      }).then(resultado=>{
        if(resultado.isConfirmed){
          this.signos.paciente = this.paciente;
          this.signosService.addSignos(this.signos).subscribe(res=>{
            if(res.status===Global.OK){
              this.cita.signos = res.body.signos;
              this.updateCita();
              this.updatePaciente();
            }
          });
        }
      });
    }else{
      Swal.fire({
        title:'Desea actualizar estos Signos?',
        html:'<table>'+
                '<tr><td style="text-align:right;">Temperatura:</td><td style="text-align:left;">&nbsp;'+this.signos.temperatura+'ºC</td></tr>'+
                '<tr><td style="text-align:right;">Estatura:</td><td style="text-align:left;">&nbsp;'+this.paciente.estatura+'m</td></tr>'+
                '<tr><td style="text-align:right;">Peso:</td><td style="text-align:left;">&nbsp;'+this.signos.peso+'Kg</td></tr>'+
                '<tr><td style="text-align:right;">Cistólica:</td><td style="text-align:left;">&nbsp;'+this.signos.presionCis+'</td></tr>'+
                '<tr><td style="text-align:right;">Diastólica:</td><td style="text-align:left;">&nbsp;'+this.signos.presionDias+'</td></tr>'+  
              '</table>',
        showCancelButton:true,
        confirmButtonText:'OK'
      }).then(resultado=>{
        if(resultado.isConfirmed){
          this.signos.paciente = this.paciente;
          this.signosService.updateSignos(this.signos._id, this.signos).subscribe(res=>{
            if(res.status===Global.OK){
              Swal.fire({
                icon:'success',
                title:'Se actualizaron los signos correctamente!',
                showCloseButton:true,
                timer:1000
              });
              this.updatePaciente();
              this.clear();
            }
          });
        }
      });
    }
  }

  updateCita():void{
    this.cita.isSignosTomados = true;
    console.log(this.cita);
    this.citasService.updateCita(this.cita._id,this.cita).subscribe(res=>{
      if(res.status===Global.OK){
        this.clear();
        Swal.fire({
          icon:'success',
          title:'Se guardaron los signos correctamente!',
          showCloseButton:true,
          timer:1000
        });
      }
    });
  }

  updatePaciente():void{
    this.pacienteService.updatePaciente(this.paciente._id,this.paciente).subscribe(res=>{
      if(res.status!=Global.OK){
        console.log('no se pudo actualizar ');
      }
    });
  }

  clear():void{
    this.HighlightRow = -1;
    this.getCitas();
    this.signos = new Signos('',new Paciente('','','',new Date(),'',0,''),0,0,0,0,new Date());
    this.medico = new Medico('','','');
    this.paciente = new Paciente('','','',new Date(),'',0,'');
    this.btnAccion = Global.GUARDAR;
  }



  tomarSignos(index:number):void{
    
    this.HighlightRow = index;
    this.cita = this.citas[index];
    this.medico = this.cita.medico;
    this.paciente = this.cita.paciente;
    this.signos.paciente = this.paciente;
    if(this.cita.signos != undefined){
      this.signos = this.cita.signos;
      this.btnAccion = Global.ACTUALIZAR;
    }else{
      this.signos = new Signos('',new Paciente('','','',new Date(),'',0,''),0,0,0,0,new Date());
      this.btnAccion = Global.GUARDAR
    }
  }

}
