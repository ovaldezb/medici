import { Component, OnInit } from '@angular/core';
import { saw } from '@igniteui/material-icons-extended';
import { Antecedentes } from 'src/app/models/antecedentes';
import { Paciente } from 'src/app/models/paciente';
import { Pregunta } from 'src/app/models/preguntas';
import { RespuestasBySeccion } from 'src/app/models/respuesta';
import { Global } from 'src/app/service/Global';
import { PreguntasService } from 'src/app/service/preguntas.service';
import Swal from 'sweetalert2';

export interface EstadoCivil {
  value: string,
  viewValue: string
}

export interface Genero {
  value: string,
  viewValue: string
}

export interface Padecimiento{
  value: string,
  viewValue: string
}

export interface Parentesco{
  value: string,
  viewValue: string
}

export interface Secciones{
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css'],
  providers:[PreguntasService]
})
export class HistoriaClinicaComponent implements OnInit {
  public preguntas:Pregunta[] = [];
  public paciente : Paciente = {} as Paciente;
  public antecendente: Antecedentes = {} as Antecedentes;
  public seccion:string="general";
  private seccionAnterior = this.seccion;
  estadoCivil : EstadoCivil[] =[
    {value:'S',viewValue:'Soltero'},
    {value:'C',viewValue:'Casado'},
    {value:'V',viewValue:'Viudo'},
    {value:'D',viewValue:'Separado'},
  ]

  genero: Genero[] =[
    {value:'M',viewValue:'Masculino'},
    {value:'F',viewValue:'Femenino'},
    {value:'O',viewValue:'Otro'},
  ];  

  padecimiento: Padecimiento[]=[
    {value:'D',viewValue:'Diabetes'},
    {value:'H',viewValue:'Hipertensión'},
    {value:'C',viewValue:'Cáncer'}
  ]

  parentesco: Parentesco[] = [
    {value:'P',viewValue:'Padre'},
    {value:'M',viewValue:'Madre'},
    {value:'H',viewValue:'Hermano(a)'},
    {value:'A',viewValue:'Abuelo(a)'},
    {value:'O',viewValue:'Tio - Otro'},
  ]

    secciones:Secciones[] = [
      {value:'general',viewValue:'General'},
      {value:'alzheimer',viewValue:'Enfermendad de Alzheimer'},
      {value:'cardiovascular',viewValue:'Enfermedad Cardiovascular'},
      {value:'diabetes',viewValue:'Diabetes mellitus'},
      {value:'cancer',viewValue:'Cáncer'},
      {value:'epoc',viewValue:'EPOC'},
      {value:'renal',viewValue:'Enfermedad renal crónica'},
      {value:'parkinson',viewValue:'Enfermedad de Parkinson'},
      {value:'esquizofrenia',viewValue:'Esquizofrenia'},
      {value:'les',viewValue:'Lupus eritematoso sistémico'},
      {value:'hemofilia',viewValue:'Hemofilia'},
    ];

    public listaChecked = new Map();
    respuestas:RespuestasBySeccion[]=[];//[{seccion:'general',respuesta:[{noPregunta:'Q1',valor:true},{noPregunta:'Q2',valor:true}]}];
    private respBySeccion : RespuestasBySeccion = new RespuestasBySeccion('',[]);

  constructor(private preguntaService:PreguntasService){}
  ngOnInit(): void {
    this.loadPreguntas();
    this.paciente.carnet='0001';
    this.paciente.nombre='Juan';
    this.paciente.apellidoP='Perez';
    this.paciente.fechaNacimiento = new Date();
    this.paciente.sexo = 'M';
    this.antecendente.edoCivil = 'C';
    this.antecendente.genero = 'O';
    this.antecendente.pg1 = false;
    this.antecendente.pg1Padecimiento = 'D';
    this.antecendente.pg2 = false;
    this.antecendente.pg2Padecimiento = 'C';
    this.antecendente.pg3 = false;
    this.antecendente.pg3Padecimiento = 'H';
    this.antecendente.pg3Parentesco = 'O';
    this.antecendente.respuestas = [];
  }

  loadPreguntas():void{
    this.preguntaService.getPreguntas(this.seccion)
    .subscribe(res=>{
      if(res.body.preguntas != null && res.body.preguntas.length >0){
        this.preguntas = res.body.preguntas;
        this.preguntas.forEach(preg=>this.listaChecked.set(preg.noPregunta,false));
        var i = 0;
        var seccionExiste = false;
        if(this.antecendente.respuestas.length > 0){
          for(i=0;i<this.antecendente.respuestas.length;i++){
            if(this.antecendente.respuestas[i].seccion===this.seccion){
              seccionExiste = true;
              break;
            }
          }
          if(seccionExiste){
            this.antecendente.respuestas[i].respuestas.forEach(res=>{
              this.listaChecked.set(res.noPregunta,res.valor);
            });
          }
        }
      }
    });
  }

  enviarHistorial():void{
    var i = 0
    var seccionExiste = false;
    for(i=0;i<this.antecendente.respuestas.length;i++){
      if(this.antecendente.respuestas[i].seccion===this.seccion){
        var seccionExiste = true;
        break;
      }
    }
    if(seccionExiste){
      this.antecendente.respuestas[i].respuestas = this.getRespuestasBySeccion();
    }else{
        this.respBySeccion.respuestas = this.getRespuestasBySeccion();
        this.respBySeccion.seccion = this.seccionAnterior;
        this.antecendente.respuestas.push(this.respBySeccion);
        this.respBySeccion = new RespuestasBySeccion('',[]);
    }
    var htmlSecciones = '';
    this.antecendente.respuestas.forEach(res=>{
      htmlSecciones +='<li>'+this.secciones.find(item=>item.value===res.seccion)?.viewValue+'</li>'
    });
    Swal.fire({
      title:"Se van a enviar los siguientes antecedentes",
      html: "<ul>"+htmlSecciones+"</ul>",
      showCancelButton:true,
      confirmButtonText:'Aceptar'     
    })
    .then(result=>{
      if(result.isConfirmed){
        this.preguntaService.guardaAntecedentes(this.antecendente)
        .subscribe(res=>{
          if(res.status===Global.OK){
            Swal.fire({
              title:'Se guardo el antecedente con éxito',
              icon:'success',
              timer:1200
            })
          }
        });
      }
    })
  }

  getRespuestasBySeccion():any[]{
    var respBySecArray = new Array();
    for(var j=0;j<this.preguntas.length;j++){
      let valor = (<HTMLInputElement>document.getElementById('Q'+(j+1)));
      respBySecArray.push({noPregunta:'Q'+(j+1),valor:valor.checked});
    }
    return respBySecArray;
  }

  cambiaSeccion(cargaPreguntas:boolean):void{
    if(this.antecendente.respuestas.length===0){
      this.respBySeccion.respuestas = this.getRespuestasBySeccion();
      this.respBySeccion.seccion = this.seccionAnterior;
      this.antecendente.respuestas.push(this.respBySeccion);
      this.respBySeccion = new RespuestasBySeccion('',[]);
    }else{
      let i=0;
      let seccionExiste = false;
      for(i=0;i<this.antecendente.respuestas.length;i++){
        if(this.antecendente.respuestas[i].seccion === this.seccionAnterior){
          seccionExiste = true;
          break;
        }
      }
      if(seccionExiste){
        this.antecendente.respuestas[i].respuestas = this.getRespuestasBySeccion();
      }else{
        this.respBySeccion.respuestas = this.getRespuestasBySeccion();
        this.respBySeccion.seccion = this.seccionAnterior;
        this.antecendente.respuestas.push(this.respBySeccion);
        this.respBySeccion = new RespuestasBySeccion('',[]);
      }
    }
    console.table(this.antecendente.respuestas);
    this.seccionAnterior = this.seccion;
    if(cargaPreguntas){
      this.loadPreguntas();
    }

  }

  cambioEdoCivil(event:any):void{
    this.antecendente.edoCivil = this.estadoCivil[event.target["selectedIndex"]].value;
  }

  cambioGenero(event:any):void{
    this.antecendente.genero = this.genero[event.target['selectedIndex']].value;
    console.log(this.antecendente);
  }

  cambiaPg1(event:boolean):void{
    this.antecendente.pg1 = event;
  }

  cambiaPg2(event:boolean):void{
    this.antecendente.pg2 = event;
  }

  cambiaPg3(event:boolean):void{
    this.antecendente.pg3 = event;
  }

  cambioPadecimiento(event:any):void{
    this.antecendente.pg1Padecimiento = this.padecimiento[event.target['selectedIndex']].value;
  }
  cambioPadecimiento2(event:any):void{
    this.antecendente.pg2Padecimiento = this.padecimiento[event.target['selectedIndex']].value;
  }
  cambioPadecimiento3(event:any):void{
    this.antecendente.pg3Padecimiento = this.padecimiento[event.target['selectedIndex']].value;
  }
  cambioParentesco3(event:any):void{
    this.antecendente.pg3Parentesco = this.parentesco[event.target['selectedIndex']].value;
  }
}
