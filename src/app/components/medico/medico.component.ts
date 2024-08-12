
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faUserDoctor, faPrint} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Cita } from 'src/app/models/citas';
import { Medicamento } from 'src/app/models/medicamento';
import { Paciente } from 'src/app/models/paciente';
import { IUser } from 'src/app/models/user';
import { CitasService } from 'src/app/service/citas.service';
import { CognitoService } from 'src/app/service/cognito.service';
import { Global } from 'src/app/service/Global';
import { MedicosService } from 'src/app/service/medicos.service';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import { FarmaciaService } from 'src/app/service/farmacia.service';
import Swal from 'sweetalert2';
import { Receta } from 'src/app/models/receta';
import { MedicamentoReceta } from 'src/app/models/medicamentoReceta';
import { CarnetService } from 'src/app/service/carnet.service';
import { Signos } from 'src/app/models/signos';
import { PrintService } from 'src/app/service/print.service';
import { Sucursal } from 'src/app/models/sucursal';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
  providers:[MedicosService, CitasService, FarmaciaService,CarnetService, PrintService ]
})
export class MedicoComponent implements OnInit, OnDestroy{
  
  public faPills = faPills;
  public faUserDoctor = faUserDoctor;
  public faWhatsapp = faWhatsapp;
  public faPrint = faPrint;
  public fechaActual = new Date();
  public citas:Cita[] = [];
  public paciente: Paciente = new Paciente('','','','',new Date(),'','','','','','','','');
  public cita:Cita = new Cita('',new Paciente('','','','',new Date(),'','','','','','','',''),new IUser('','','','','','','','','','','','','','',false,'','','',false,new Sucursal('','','','','','',false)),new Date(),'',new Date(),new Date(),false, [],false,[],'','','',new Date(),new Date(),'');
  private dia:string = ''; 
  private mes:string = '';
  private year:string = '';
  private idMedico:string='';
  public HighlightRow:number=-1;
  public medico:IUser= {} as IUser;
  private intervalId:any = 0;
  private intervalEtapa1:any=0;
  private intervalEtapa2:any=0;
  private intervalEtapa3:any=0;
  private intervalEtapa4:any=0;
  public intervaloE1Porcentaje:number=0;
  public intervaloE2Porcentaje:number=0;
  public intervaloE3Porcentaje:number=0;
  public intervaloE4Porcentaje:number=0;
  private duracionE1:number=Global.DURACION_E1*60*1000;
  private duracionE2:number=Global.DURACION_E2*60*1000;
  private duracionE3:number=Global.DURACION_E3*60*1000;
  private duracionE4:number=Global.DURACION_E4*60*1000;
  private tiempoRefresh:number=1*1000;
  public medicamento:Medicamento=new Medicamento('','','','','','','','','');
  public listaBusquedaMedicamento:Medicamento[]=[];
  public isMedicamentoOpen:boolean=false;
  public HighlightMedicamento:number=-1;
  public isSearchingMedicamento:boolean=false;
  public isWorking:boolean=false;
  public receta:Receta= new Receta([]);
  public listaSignos:Signos[] = [];

  constructor(private medicoService:MedicosService, 
              private citasService:CitasService,
              private cognitoService:CognitoService, 
              private farmaciaService:FarmaciaService,
              private carnetService:CarnetService,
              private printService:PrintService){}
  
  ngOnInit(): void {
    this.isWorking = true;
    this.dia = this.fechaActual.getDate() < 10 ? '0'+this.fechaActual.getDate() : this.fechaActual.getDate()+'';
    this.mes = (this.fechaActual.getMonth() + 1) < 10 ? '0'+(this.fechaActual.getMonth() + 1)  : (this.fechaActual.getMonth() + 1)+'';
    this.year = this.fechaActual.getFullYear()+'';
    this.cognitoService.getUser()
    .then(user=>{
      this.medicoService.getMedicoByEmail(user.attributes.email)
      .subscribe(res=>{
        if(res.body.medico!=undefined && res.body.medico.length > 0){
          this.medico = res.body.medico[0];
          this.idMedico = this.medico._id;
          this.getCitas();
          this.isWorking = false;
        }
      });
    })
    this.intervalId = setInterval(
      ()=>{
        this.getCitas()
      }, 
      Global.REFRESH_CITA);
  }

  counterE1():void{
    this.intervalEtapa1 = setInterval(()=>{
      if(this.intervaloE1Porcentaje < 100){
        this.intervaloE1Porcentaje += this.tiempoRefresh / this.duracionE1  * 100;
      }else{
        clearInterval(this.intervalEtapa1);
        this.counterE2();
      }
    },this.tiempoRefresh);
  }

  counterE2():void{
    this.intervalEtapa2 = setInterval(()=>{
      if(this.intervaloE2Porcentaje < 100){
        this.intervaloE2Porcentaje += this.tiempoRefresh / this.duracionE2  * 100;
      }else{
        clearInterval(this.intervalEtapa2);
        this.counterE3();
      }
    },this.tiempoRefresh);
  }

  counterE3():void{
    this.intervalEtapa3 = setInterval(()=>{
      if(this.intervaloE3Porcentaje < 100){
        this.intervaloE3Porcentaje += this.tiempoRefresh / this.duracionE3  * 100;
      }else{
        clearInterval(this.intervalEtapa3);
        this.counterE4();
      }
    },this.tiempoRefresh);
  }

  counterE4():void{
    this.intervalEtapa4 = setInterval(()=>{
      if(this.intervaloE4Porcentaje < 100){
        this.intervaloE4Porcentaje += this.tiempoRefresh / this.duracionE4  * 100;
      }else{
        clearInterval(this.intervalEtapa4);
      }
    },this.tiempoRefresh);
  }

  ngOnDestroy():void{
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
    clearInterval(this.intervalEtapa1);
  }

  getCitas():void{
    this.citasService.getCitasByFechaAndMedico(this.year+'-'+this.mes+'-'+this.dia,this.idMedico).subscribe(res=>{
      if(res.status === Global.OK){
        this.citas = res.body.citas;
      }
    });
  }

  abreBuscaMedicamento():void{
    this.isMedicamentoOpen = true;
  }

  cierraModal():void{
    this.isMedicamentoOpen = false;
  }

  buscaMedicamento():void{
    this.isSearchingMedicamento =true;
    this.farmaciaService.getMedicamentos(this.medicamento.nombre)
    .subscribe(res=>{
      this.isSearchingMedicamento = false;
      if(res.status === Global.OK && res.body.medicamentos.length>0){
        this.listaBusquedaMedicamento = res.body.medicamentos;
      }else{
        Swal.fire('No se encontró alguna coincidencia');
        this.medicamento.nombre='';
      }
    })
  }

  buscaMedicamentoEnter(event:any):void{
    if(event.keyCode===Global.ENTER){
      this.buscaMedicamento();
    }
  }

  seleccionaMedicamento():void{
    this.receta.medicamentoReceta.push(new MedicamentoReceta(this.listaBusquedaMedicamento[this.HighlightMedicamento].nombre,''));
    this.HighlightMedicamento = -1;
    this.limpiarBusqueda();
    this.cierraModal();
  }

  limpiarBusqueda():void{
    this.listaBusquedaMedicamento=[];
    this.medicamento.nombre='';
    this.HighlightMedicamento = -1;
  }

   highlightMedicamento(index:number):void{
    this.HighlightMedicamento = index;
  }

  atenderPaciente(index:number):void{
    this.HighlightRow = index;
    this.cita = this.citas[index];
    this.listaSignos = this.cita.signos.reverse();
    this.paciente = this.cita.paciente;
    this.receta.medicamentoReceta = this.cita.medicamentoReceta;
    if(!this.cita.isAtendido){
      this.counterE1();
      if(this.cita.horaConsultaInicio === null || this.cita.horaConsultaInicio === undefined){
        this.cita.horaConsultaInicio = new Date();
        this.citasService.updateCita(this.cita._id,this.cita)
        .subscribe(res=>{
          
        });
      }
    }
  }

  regresar():void{
    this.HighlightRow = -1;
  }

  imprimeReceta():void{
    this.citasService.updateCita(this.cita._id,this.cita)
      .subscribe(res=>{
        this.printService.printDocument(this.cita._id,this.cita)
      });
    
  }

  modificaCarnetCitas(folio:string, amount:number):void{
    this.carnetService.updateCitasCarnet(folio,amount)
    .subscribe(res=>{
      //Se disminuyó el número de citas disponibles
    });
  }

  finalizaConsulta():void{
    if(this.paciente.carnet != '' && this.paciente.carnet != undefined){
      this.carnetService.getCarnetByFolio(this.paciente.carnet)
          .subscribe(res =>{
            if(res.body.carnet.length > 0){
              let carnet = res.body.carnet[0];
              carnet.citas.push(this.cita._id);
              this.carnetService.updateCarnet(carnet._id,carnet)
                .subscribe(res1=>{  
                  this.modificaCarnetCitas(this.paciente.carnet,Global.MENOSUNO);
                 });
            }  
          });
    }
    this.cita.isAtendido = true;
    this.cita.horaCitaFin = new Date();
    this.cita.medicamentoReceta = this.receta.medicamentoReceta;
    this.citasService.updateCita(this.cita._id,this.cita)
    .subscribe(res=>{
      this.receta = new Receta([]);
      Swal.fire({
        text:'La cita se ha completado',
        timer: Global.TIMER_OFF
      });
      this.citas[this.HighlightRow].isAtendido = true;
      this.getCitas();
      this.HighlightRow = -1;
    });
    
    this.intervalEtapa1 = 0;
    this.intervalEtapa2 = 0;
    this.intervalEtapa3 = 0;
    this.intervalEtapa4 = 0;
    clearInterval(this.intervalEtapa1);
    clearInterval(this.intervalEtapa2);
    clearInterval(this.intervalEtapa3);
    clearInterval(this.intervalEtapa4);
  }

  

}
