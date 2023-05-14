import { Component, OnInit } from '@angular/core';
import { faUser, faUserDoctor, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Medico } from 'src/app/models/medico';
import { MedicosService } from 'src/app/service/medicos.service';
import { Router } from '@angular/router';
import { Global } from 'src/app/service/Global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admom',
  templateUrl: './admom.component.html',
  styleUrls: ['./admom.component.css'],
  providers:[MedicosService]
})
export class AdmomComponent implements OnInit{

  public medicos:Medico[] = [];
  public medico:Medico = new Medico("","","");
  public faCoffee = faUser;
  public faUserDoctor = faUserDoctor;
  public faPencil = faPencil;
  public faTrashCan = faTrashCan;
  public accionBtn: String = Global.AGREGAR;

  constructor(private _router : Router, private medicoService: MedicosService){

  }
  
  
  ngOnInit(): void {
    this.loadAllMedicos();
  }

  loadAllMedicos():void{
    this.medicoService.getAllMedicos().subscribe((res)=>{
      console.log(res.body.medicos);
      if(res.status === Global.OK){
        this.medicos = res.body.medicos
      }
    })
  }

  addUpdateMedico():void{
    if(this.accionBtn === Global.AGREGAR){
      Swal.fire({
        title:'Esta seguro que desea registrar éste Médico?',
          showCancelButton:true,
          confirmButtonText:'OK'
      }).then(resultado=>{
        if(resultado.isConfirmed){
          this.medicoService.addMedico(this.medico).subscribe((res)=>{
            if(res.status===Global.OK){
              this.loadAllMedicos();
              this.medico = new Medico('','','');
              Swal.fire({
                icon: 'success',
                title: 'El médico se ha agregado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Lo Sentimos...',
                text: 'Algo salió mal, inténtalo más tarde',
              });
            }
          });
        }
      });   
    }else{
      Swal.fire({
        title:'Esta seguro que desea actualizar éste Médico?',
          showCancelButton:true,
          confirmButtonText:'OK'
      }).then(resultado=>{
        if(resultado.isConfirmed){
          this.medicoService.updateMedico(this.medico._id,this.medico).subscribe((res)=>{
            if(res.status===Global.OK){
              Swal.fire({
                icon: 'success',
                title: 'El médico se ha actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
              });
              this.loadAllMedicos();
              this.medico = new Medico('','','');
              this.accionBtn = Global.AGREGAR;
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Lo Sentimos...',
                text: 'Algo salió mal, inténtalo más tarde',
              });
            }
          });
        }
      });

    }
  }

  editarMedico(index:number):void{
    this.medico = this.medicos[index];
    this.accionBtn = Global.ACTUALIZAR;

  }
  borrarMedico(index:number):void{
    Swal.fire({
      title:'Esta seguro que desea eliminar éste Médico? ',
      text: this.medicos[index].nombre,
        showCancelButton:true,
        confirmButtonText:'Si'
    }).then(resultado=>{
      if(resultado.isConfirmed){
        this.medicoService.deleteMedico(this.medicos[index]._id).subscribe((res)=>{
          if(res.status===Global.OK){
            Swal.fire({
              icon: 'success',
              title: 'El médico se ha eliminado exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.loadAllMedicos();
          }
        });
      }
    })
    
  }
  cancelar():void{
    this.medico = new Medico('','','');
    this.accionBtn = Global.AGREGAR;
  }

  selectRow(index:number):void{

  }

}
