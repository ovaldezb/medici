import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { Global } from 'src/app/service/Global';
import { PerfilService } from 'src/app/service/perfil.service';
import Swal from 'sweetalert2';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { text } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css'],
  providers:[PerfilService]
})
export class PerfilesComponent implements OnInit {

  public perfiles:Perfil[]=[]
  public perfil:Perfil= {} as Perfil;
  public faTrash = faTrash;
  public faPencil = faPencil;
  public btnAccion:string = Global.AGREGAR;
  public HighlightRow:number=-1;
  constructor(private perfilesService:PerfilService){}
  
  ngOnInit(): void {
    this.loadPerfiles();
  }

  agregaActualizaPerfil():void{
    if(this.btnAccion === Global.AGREGAR){
      Swal.fire({
        title:'Desea agregar este perfil?',
        showCancelButton: true,
        confirmButtonText: 'Guardar'
      })
      .then(response =>{
        if(response.isConfirmed){
          this.perfilesService.addPerfil(this.perfil)
          .subscribe(res=>{
            if(res.status === Global.OK){
              Swal.fire({
                icon:'success',
                title:'Exito!',
                text:'Se ha guardado el perfil exitosamente!'
              });
              this.perfil = {} as Perfil;
              this.loadPerfiles();
            }
          });
        }
      });
    }else{
      Swal.fire({
        title:'Desea actualizar este perfil?',
        showCancelButton: true,
        confirmButtonText: 'Actualizar'
      })
      .then(response=>{
        if(response.isConfirmed){
          this.perfilesService.updatePerfil(this.perfil._id,this.perfil)
          .subscribe(res=>{
            if(res.status === Global.OK){
              Swal.fire({
                title:'El perfil se ha actualizado exitosamente!',
                timer:1500
              });
              //this.perfil = {} as Perfil;
              //this.HighlightRow = -1;
              this.limpiar();
              this.loadPerfiles();
            }
          })
        }
      })
    }
    
  }

  loadPerfiles():void{
    this.perfilesService.getAllPerfiles()
    .subscribe(res=>{
      if(res.body.perfiles.length > 0){
        this.perfiles = res.body.perfiles;
      }
    });
  }

  selectRow(index:number):void{
    this.HighlightRow = index;
  }

  editRow(index:number):void{
    this.btnAccion = Global.ACTUALIZAR;
    this.perfil = this.perfiles[index];
  }

  deletePerfil(index:number):void{
    Swal.fire({
      icon:'warning',
      title:'Desea eliminar este perfil?',
      text:'Eliminar un perfil puede ocasionar fallas en el sistema, sólo un Administrado debe hacerlo! '
    })
    .then(response=>{
      if(response.isConfirmed){
        this.perfilesService.deletePerfil(this.perfiles[index]._id)
        .subscribe(res=>{
          if(res.status===Global.OK){
            Swal.fire({
              text:'El perfil se ha eliminado correctamente',
              timer:1500
            });
            this.loadPerfiles();
            this.HighlightRow = -1;
          }
        })
      }
    })
  }

  limpiar():void{
    this.HighlightRow = -1;
    this.btnAccion = Global.AGREGAR;
    this.perfil = {} as Perfil;
  }
}
