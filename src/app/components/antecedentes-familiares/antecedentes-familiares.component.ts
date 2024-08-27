import { Component, OnInit } from '@angular/core';
import { PreguntaAF } from 'src/app/models/preguntasAF';
import { PregresafService } from 'src/app/service/pregresaf.service';
import { faArrowLeft, faArrowRight, faL, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { RespuestasAF } from 'src/app/models/respuestaAF';
import { Paciente } from 'src/app/models/paciente';
import { TipoRespuestaAF } from 'src/app/models/tipoRespuestaAF';
import { PacienteService } from 'src/app/service/paciente.service';
import { Global } from 'src/app/service/Global';

@Component({
  selector: 'app-antecedentes-familiares',
  templateUrl: './antecedentes-familiares.component.html',
  styleUrls: ['./antecedentes-familiares.component.css'],
  providers:[PregresafService,PacienteService]
})
export class AntecedentesFamiliaresComponent implements OnInit {
  
  constructor(private pregresafService:PregresafService, private pacienteService:PacienteService){}
  
  public preguntasAF : PreguntaAF[] = [];
  public currentPreguntaAF : PreguntaAF = new PreguntaAF('',[{_id:'',respuesta:'',valor:''}],'',false,0,[]);
  public currentIndex:number = 0;
  public faArrowLeft = faArrowLeft;
  public faArrowRight = faArrowRight;
  public faSpinner = faSpinner;
  public lastIndex : number = 0;
  public avancePorcent:number =0;
  public isLoadingPreguntas:boolean = false;
  public respuestasAF: RespuestasAF = new RespuestasAF('1',{} as Paciente,[new TipoRespuestaAF(0,'',[])]);
  public valueRespuesta:string='';
  public nombrePaciente:string='';
  public apellidoPaterno:string='';
  public listaPacientes:Paciente[] = [];
  public isFillingAntecedentes:boolean=false;
  public paciente : Paciente = new Paciente('','','','',new Date(),'M','','','','','','','');
  

  ngOnInit(): void {
    
  }

  public obtienePreguntas():void{
    this.isLoadingPreguntas = true;
    this.pregresafService.getAllPreguntas()
    .subscribe(res=>{
      this.isLoadingPreguntas = false;
      this.preguntasAF = res.body.preguntas
      this.currentPreguntaAF = this.preguntasAF[0];
      this.lastIndex = this.preguntasAF.length;
      var i=0;
      
      for(i=0;i<this.lastIndex-1;i++){
        this.respuestasAF.respuestas.push(new TipoRespuestaAF(0,'',[]));
        this.preguntasAF[i].listaChecked = [];
      }
      this.preguntasAF[this.lastIndex-1].listaChecked=[];
      
      for(i=0;i<this.respuestasAF.respuestas.length;i++){
        if(this.preguntasAF[i].opcional){
          for(var j=0;j<this.preguntasAF[i].respuestas.length;j++){
            this.respuestasAF.respuestas[i].listaChecked.push(false);
            this.preguntasAF[i].listaChecked.push(false);
          }
        }
      }

      this.avancePorcent = (this.currentIndex+1) / this.lastIndex *100;
    })
  }

  public anterior():void{
    if(this.currentIndex > 0){
      this.respuestasAF.respuestas[this.currentIndex].idRes = this.valueRespuesta;
      this.respuestasAF.respuestas[this.currentIndex].idPreg = this.currentPreguntaAF.orden;
      this.valueRespuesta = '';
      this.currentIndex--;
      this.currentPreguntaAF= this.preguntasAF[this.currentIndex];
      if(!this.currentPreguntaAF.opcional && this.respuestasAF.respuestas[this.currentIndex].idRes != ''){
        this.valueRespuesta = this.respuestasAF.respuestas[this.currentIndex].idRes;
      }
      this.avancePorcent = (this.currentIndex+1)/this.lastIndex * 100;
      
    }
  }

  public siguiente():void{
    if(this.currentIndex < this.lastIndex-1){
      this.respuestasAF.respuestas[this.currentIndex].idRes = this.valueRespuesta;
      this.respuestasAF.respuestas[this.currentIndex].idPreg = this.currentPreguntaAF.orden;
      this.valueRespuesta = '';
      this.currentIndex++;
      this.currentPreguntaAF= this.preguntasAF[this.currentIndex];
      if(!this.currentPreguntaAF.opcional && this.respuestasAF.respuestas[this.currentIndex].idRes!=''){
        this.valueRespuesta = this.respuestasAF.respuestas[this.currentIndex].idRes;
      }
      this.avancePorcent = (this.currentIndex+1)/this.lastIndex * 100;
     
    }
  }

  enviarRespuestas():void{
    for(var i=0;i<this.preguntasAF.length;i++){
      if(this.preguntasAF[i].opcional){
        this.respuestasAF.respuestas[i].listaChecked = this.preguntasAF[i].listaChecked;
      }
    }
  }

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
    //this.paciente = new Paciente('','','','',new Date(),'M','','','','','','','');
    this.paciente = this.listaPacientes[index];
    //this.calculaFechaNacimiento();
    this.listaPacientes =[];
    this.isFillingAntecedentes = true;
    this.obtienePreguntas();
  }

}
