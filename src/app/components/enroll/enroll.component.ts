import { Component, OnInit } from '@angular/core';
import { faUserPlus, faUserPen, faUserXmark, faFilePen } from '@fortawesome/free-solid-svg-icons'; 
import { Carnet } from 'src/app/models/carnet';
import { Paciente } from 'src/app/models/paciente';
import { Global } from 'src/app/service/Global';
import { CarnetService } from 'src/app/service/carnet.service';
import { PacienteService } from 'src/app/service/paciente.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css'],
  providers:[PacienteService, CarnetService]
})
export class EnrollComponent {

  public faUserPlus = faUserPlus;
  public faUserPen = faUserPen;
  public faUserXmark = faUserXmark;
  public faFilePen = faFilePen;
  public HighlightRow:number=-1;
  public listaPacientes:Paciente[] = [];
  public listaPacientesCarnet:Paciente[] = [];
  public listaPacientesDelete:Paciente[] = [];
  public paciente:Paciente = {} as Paciente;
  public isSearching:boolean = false;
  public isSearchingCarnet:boolean = false;
  public carnet : Carnet = new Carnet('','',new Date(),20,[],[]);
  public folio : string = '';
  public isAdd : boolean = true;
  public tipoBusqueda: string='nombre';

  constructor(private pacienteService:PacienteService, private carnetService:CarnetService){}
  

  buscaCarnet():void{
    this.isSearchingCarnet = true;
    this.carnetService.getCarnetByFolio(this.folio)
    .subscribe(res=>{
      this.isAdd = false;
      this.isSearchingCarnet = false;
      if(res.status === Global.OK && res.body.carnet.length > 0){
        this.carnet = res.body.carnet[0];
        this.listaPacientesCarnet = this.carnet.pacientes;
      }else{
        Swal.fire({
          text:'No se encontró un carnet con ese folio',
          timer: Global.TIMER_OFF
        });
      }
    },err=>{
      this.isSearchingCarnet = false;
      console.log('aqui va el error');
    });
  }

  addCarnet():void{
    Swal.fire({
      icon:'warning',
      title:'Está seguro que desea agregar estos pacientes al carnet?',
      showCancelButton: true,
      confirmButtonText:'Si'
    })
    .then(resultado=>{
      if(resultado.isConfirmed){
        this.carnet.pacientes = this.listaPacientesCarnet;
        this.carnetService
        .addCarnet(this.carnet)
        .subscribe(res=>{
          if(res.status===Global.OK){
            Swal.fire({
              text:'Se ha guardado el carnet con éxito, con número '+res.body.carnet.folio,
            });
            this.updatePacienteCarnet(res.body.carnet.folio);
            this.listaPacientesCarnet = [];
          }else{
            Swal.fire({
              text:'Hubo un error al guardar el carnet, inténtelo más tarde',
              timer:Global.TIMER_OFF
            })
          }
        });
      }
    })
  }

  editCarnet():void{
    Swal.fire({
      icon:'warning',
      title:'Está seguro que desea guardar estos pacientes en el carnet '+this.carnet.folio,
      showCancelButton: true,
      confirmButtonText:'Si'
    }).then(resultado=>{
      if(resultado.isConfirmed){
        this.carnet.pacientes = this.listaPacientesCarnet;
        this.carnetService.updateCarnet(this.carnet._id, this.carnet)
        .subscribe(res=>{
          if(res.status === Global.OK){
            this.updatePacienteCarnetRemove();
            this.updatePacienteCarnet(this.carnet.folio);
            Swal.fire({
              text:'Los pacientes asociados alfolio '+this.carnet.folio+' se han actualizado correctamente'
            });
            this.isAdd = true;
            this.listaPacientesDelete = [];
            this.listaPacientesCarnet = [];
            this.carnet = new Carnet('','',new Date(),20,[],[]);
            this.folio = '';
          }
        });
      }
    });
  }

  updatePacienteCarnet(folio:string):void{
    this.listaPacientesCarnet.forEach(paciente=>{
      paciente.carnet = folio;
      this.pacienteService.updatePaciente(paciente._id, paciente).subscribe(res1=>{})
    });
  }

  updatePacienteCarnetRemove():void{
    this.listaPacientesCarnet.forEach(paciente=>{
      paciente.carnet = '';
      this.pacienteService.updatePaciente(paciente._id, paciente).subscribe(res1=>{})
    });
  }

  deleteMember():void{
    this.listaPacientesDelete.push(this.listaPacientesCarnet[this.HighlightRow]);
    this.listaPacientesCarnet.splice(this.HighlightRow,1)
    this.HighlightRow = -1;
  }

  selectRow(index:number):void{
    this.HighlightRow = index;
  }
  agregarPacienteCarnet(index:number):void{
    const pacienteCarnet = this.listaPacientes[index];
    if(pacienteCarnet.carnet!='' && pacienteCarnet.carnet != undefined){
      Swal.fire({
        text:'El paciente '+pacienteCarnet.nombre+' '+pacienteCarnet.apellidoP+' esta registrado en otro carnet'
      });
      this.listaPacientes.splice(index,1);
      return;
    }
    const pacienteExistente = this.listaPacientesCarnet.filter(paciente=>{
      return paciente._id===this.listaPacientes[index]._id
    });
    if(pacienteExistente.length > 0){
      Swal.fire({
        text:'El paciente ya es parte del carnet'
      });

    }else if(this.listaPacientesCarnet.length >= 5){
      Swal.fire({
        text:'Ha alcanzado el número máximo de pacientes que puede registrar en un carnet'
      });
    } else{
      this.listaPacientesCarnet.push(this.listaPacientes[index]);
    }
    this.listaPacientes.splice(index,1);
    this.paciente.nombre = '';
  }

  buscaPaciente():void{
    this.isSearching = true;
    if(this.tipoBusqueda===Global.NOMBRE){
      this.pacienteService
      .findPacienteByNombre(this.paciente.nombre)
      .subscribe(res=>{
        this.isSearching = false;
        this.paciente.nombre = '';
        if(res.body.pacientes!= null && res.body.pacientes.length > 0){
          this.listaPacientes = res.body.pacientes;
        }else{
          Swal.fire({
            text:'No se encontró ningún paciente que coincida con el criterio de búsqueda, intente con otro criterio.',
            timer:2500
          });
        }
      });
    }else if(this.tipoBusqueda === Global.APELLIDO){
      this.pacienteService
      .findPacienteByApellido(this.paciente.nombre)
      .subscribe(res=>{
        this.isSearching = false;
        this.paciente.nombre = '';
        if(res.body.pacientes!= null && res.body.pacientes.length > 0){
          this.listaPacientes = res.body.pacientes;
        }else{
          Swal.fire({
            text:'No se encontró ningún paciente que coincida con el criterio de búsqueda, intente con otro criterio.',
            timer:2500
          });
        }
      })
    }else if(this.tipoBusqueda === Global.TELEFONO){
      this.pacienteService.findPacienteByTelefono(this.paciente.nombre)
      .subscribe(res=>{
        this.isSearching = false;
        this.paciente.nombre = '';
        if(res.body.pacientes!= null && res.body.pacientes.length > 0){
          this.listaPacientes = res.body.pacientes;
        }else{
          Swal.fire({
            text:'No se encontró ningún paciente que coincida con el criterio de búsqueda, intente con otro criterio.',
            timer:2500
          });
        }
      });
    }
  }

  buscaPacienteEnter(event:any):void{
    if(event.keyCode === Global.ENTER){
      this.buscaPaciente();
    }
  }

  selectTipoBusqueda(event:any):void{
    this.tipoBusqueda = event.explicitOriginalTarget.defaultValue;
  }

  limpiarCarnet():void{

  }
}
