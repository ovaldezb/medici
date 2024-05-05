import { Component, OnInit } from '@angular/core';
import { faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { CitasService } from 'src/app/service/citas.service';
import { SignosService} from 'src/app/service/signos.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { Global } from 'src/app/service/Global';
import { Cita } from 'src/app/models/citas';
import { Paciente } from 'src/app/models/paciente';
import { Signos } from 'src/app/models/signos';
import Swal from 'sweetalert2';
import { IUser } from 'src/app/models/user';
import { faPlus, faFaceSmile, faFaceRollingEyes, faFaceSadCry, faFaceSadTear, faFaceFrown, faFaceMeh, faFaceLaugh, faFaceTired, faFaceGrimace, faFaceAngry } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-enfermeria',
  templateUrl: './enfermeria.component.html',
  styleUrls: ['./enfermeria.component.css'],
  providers: [CitasService, SignosService, PacienteService]

})
export class EnfermeriaComponent implements OnInit{
  public faPlus = faPlus;
  public faFaceAngry = faFaceAngry;
  public faFaceGrimace = faFaceGrimace;
  public faFaceSadCry = faFaceSadCry;
  public faFaceSadTear = faFaceSadTear;
  public faFaceFrown = faFaceFrown;
  public faFaceSmile = faFaceSmile;
  public faFaceMeh = faFaceMeh;
  public faFaceLaugh = faFaceLaugh;
  public faFaceTired = faFaceTired;
  public faFaceRollingEyes = faFaceRollingEyes;
  public btnAccion: string = Global.GUARDAR;
  public HighlightRow:number = -1;
  public faUserNurse = faUserNurse;
  public fechaActual = new Date();
  public citas:Cita[] = [];
  public cita:Cita = new Cita('',new Paciente('','','','',new Date(),'','','','','','',''),new IUser('','','','','','','','','','','','','','',false,'','','',false,''),new Date(),'','',15,false,[{} as Signos], false,[]);
  public paciente:Paciente = new Paciente('','','','',new Date(),'','','','','','','');
  public medico:IUser = {} as IUser;
  public signos: Signos = new Signos('',new Paciente('','','','',new Date(),'','','','','','',''),0,0,0,0,0,new Date(),0,0,0,0,'',0,0);
  private dia:string = ''; 
  private mes:string = '';
  private year:string = '';
  public escala:number = 0;
  public isWorking:boolean=false;
  private intervaloRecargaPacientes:any = 0;
  public background:string[]=new Array('LightGray','LightGray','LightGray','LightGray','LightGray','LightGray','LightGray','LightGray','LightGray','LightGray');
  
  constructor(
    private citasService:CitasService, 
    private signosService:SignosService, 
    private pacienteService: PacienteService){}

  ngOnInit(): void {
    this.isWorking = true;
    this.dia = this.fechaActual.getDate() < 10 ? '0'+this.fechaActual.getDate() : this.fechaActual.getDate()+'';
    this.mes = (this.fechaActual.getMonth() + 1) < 10 ? '0'+(this.fechaActual.getMonth() + 1)  : (this.fechaActual.getMonth() + 1)+'';
    this.year = this.fechaActual.getFullYear()+'';
    this.getCitas();
    this.intervaloRecargaPacientes = setInterval(()=>{
      this.getCitas();
    }, Global.REFRESH_CITA);
  }

  getCitas():any{
    this.citasService.getCitasByFecha(this.year+'-'+this.mes+'-'+this.dia)
    .subscribe(res=>{
      this.isWorking = false;
      if(res.status === Global.OK && res.body.citas.length > 0){
        this.citas = res.body.citas;
      }
    });
  }

  selectAllContent(event:any):void{
    event.target.select();
  }

  select(index:number):void{
    this.escala = index;
    this.signos.escalaDolor = this.escala;
    this.background=new Array('LightGray','LightGray','LightGray','LightGray','LightGray','LightGray','LightGray','LightGray','LightGray','LightGray');
    this.background[index] = 'aqua';
  }

  guardaSignos():void{
    if(this.btnAccion === Global.GUARDAR){
      Swal.fire({
        title:'Se van a guardar estos Signos?',
        html:'<table class="table table-bordered">'+
                '<tr><td style="text-align:right;">Temperatura:</td><td style="text-align:left;">&nbsp;'+this.signos.temperatura+'ºC</td><td>&nbsp;</td><td>F. Cardiaca</td><td>'+this.signos.frecuenciaCardiaca+'</td></tr>'+
                '<tr><td style="text-align:right;">Talla:</td><td style="text-align:left;">&nbsp;'+this.signos.estatura+'m</td><td>&nbsp;</td><td>F. Respiratoria</td><td>'+this.signos.frecuenciaRespiratoria+'</td></tr>'+
                '<tr><td style="text-align:right;">Peso:</td><td style="text-align:left;">&nbsp;'+this.signos.peso+'Kg</td><td>&nbsp;</td><td>SPO2</td><td>'+this.signos.spo2+'</td></tr>'+
                '<tr><td style="text-align:right;">Sistólica:</td><td style="text-align:left;">&nbsp;'+this.signos.presionSis+'</td><td>&nbsp;</td><td>Glucotest</td><td>'+this.signos.glucotest+'</td></tr>'+
                '<tr><td style="text-align:right;">Diastólica:</td><td style="text-align:left;">&nbsp;'+this.signos.presionDias+'</td><td>&nbsp;</td><td>Escala de Dolor</td><td>'+this.signos.escalaDolor+'</td></tr>'+  
              '</table>',
        showCancelButton:true,
        confirmButtonText:'OK'
      }).then(resultado=>{
        if(resultado.isConfirmed){
          this.isWorking = true;
          this.signos.paciente = this.paciente;
          this.signosService.addSignos(this.signos).subscribe(res=>{
            if(res.status===Global.OK){
              this.cita.signos.push(res.body.signos); // Aqui se actualizan los signos en la cita, hay que cambiarlo a un arreglo
              this.updateCita();
            }
          });
        }
      });
    }else{
      Swal.fire({
        title:'Desea actualizar estos Signos?',
        html:'<table>'+
                '<tr><td style="text-align:right;">Temperatura:</td><td style="text-align:left;">&nbsp;'+this.signos.temperatura+'ºC</td></tr>'+
                '<tr><td style="text-align:right;">Estatura:</td><td style="text-align:left;">&nbsp;'+this.signos.estatura+'m</td></tr>'+
                '<tr><td style="text-align:right;">Peso:</td><td style="text-align:left;">&nbsp;'+this.signos.peso+'Kg</td></tr>'+
                '<tr><td style="text-align:right;">Sistólica:</td><td style="text-align:left;">&nbsp;'+this.signos.presionSis+'</td></tr>'+
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
              this.clear();
            }
          });
        }
      });
    }
  }

  updateCita():void{
    this.cita.isSignosTomados = true;
    let arraySignoValido = this.cita.signos.filter(signo => signo._id!='');
    console.log(arraySignoValido);
    this.cita.signos = arraySignoValido;
      this.citasService.updateCita(this.cita._id,this.cita).subscribe(res=>{
        this.isWorking = false;
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

  /*updatePaciente():void{
    this.pacienteService.updatePaciente(this.paciente._id,this.paciente).subscribe(res=>{
      if(res.status!=Global.OK){
        console.log('no se pudo actualizar ');
      }
    });
  }*/

  clear():void{
    this.HighlightRow = -1;
    this.escala = 0
    this.getCitas();
    this.signos = new Signos('',new Paciente('','','','',new Date(),'','','','','','',''),0,0,0,0,0,new Date(),0,0,0,0,'',0,0);
    this.medico = new IUser('','','','','','','','','','','','','','',false,'','','',false,'');
    this.paciente = new Paciente('','','','',new Date(),'','','','','','','');
    this.btnAccion = Global.GUARDAR;
  }

  tomarSignos(index:number):void{
    this.HighlightRow = index;
    this.cita = this.citas[index];
    this.medico = this.cita.medico;
    this.paciente = this.cita.paciente;
    this.signos.paciente = this.paciente;
    if(this.cita.signos.length !=0){
      this.signos = this.cita.signos[0];
      this.btnAccion = Global.ACTUALIZAR;
    }else{
      this.cita.signos.push(new Signos('',new Paciente('','','','',new Date(),'','','','','','',''),0,0,0,0,0,new Date(),0,0,0,0,'',0,0));
      this.signos = new Signos('',new Paciente('','','','',new Date(),'','','','','','',''),0,0,0,0,0,new Date(),0,0,0,0,'',0,0);
      this.btnAccion = Global.GUARDAR
    }
  }

  nuevaTomaPaciente(index:number):void{
    this.cita = this.citas[index];
    this.medico = this.cita.medico;
    this.paciente = this.cita.paciente;
    this.signos.paciente = this.paciente;
    this.signos = new Signos('',new Paciente('','','','',new Date(),'','','','','','',''),0,0,0,0,0,new Date(),0,0,0,0,'',0,0);
    this.btnAccion = Global.GUARDAR
  }

}
