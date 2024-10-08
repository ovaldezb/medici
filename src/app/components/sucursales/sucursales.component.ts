import { Component, OnInit } from '@angular/core';
import { faIdCard, faPhone, faCircleCheck, faHouse, faLocationDot, faUserTie, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Folio } from 'src/app/models/folio';
import { Sucursal } from 'src/app/models/sucursal';
import { FolioService } from 'src/app/service/folio.service';
import { Global } from 'src/app/service/Global';
import { SucursalService } from 'src/app/service/sucursal.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css'],
  providers: [SucursalService,FolioService]
})
export class SucursalesComponent implements OnInit{

  public faIdCard = faIdCard;
  public faHouse = faHouse;
  public faLocationDot = faLocationDot;
  public faUserTie = faUserTie;
  public faPhone = faPhone;
  public faCircleCheck = faCircleCheck;
  public faTrash = faTrash;
  public faPencil = faPencil;
  public sucursal: Sucursal={} as Sucursal;
  public sucursales: Sucursal[] = [];
  public showSpinner:boolean = false;
  public btnAccion:string=Global.AGREGAR;
  

  constructor(private sucursalService:SucursalService, private folioService:FolioService){}
  
  ngOnInit(): void {
    this.loadSucursales();
  }

  loadSucursales():void{
    this.sucursalService.getAllSucursales()
    .subscribe(res=>{
      if(res.body.sucursales && res.body.sucursales.length > 0){
        this.sucursales = res.body.sucursales;
      }
    });
  }

  guardarEditar():void{
    if(this.btnAccion === Global.AGREGAR){
      this.saveSucursal();
    }else{
      this.editar();
    }
  }

  saveSucursal():void{
    Swal.fire({
      icon:'question',
      title:'Desea guardar esta sucursal?',
      showCancelButton:true,
      confirmButtonText:'Si'
    })
    .then(resultado=>{
      if(resultado.isConfirmed){
        this.showSpinner = true;
        this.sucursalService.addSucursal(this.sucursal)
        .subscribe(res=>{
          if(res.body.sucursal){
            let folioCarnet = new Folio('',0,Global.CARNET,res.body.sucursal.identificador);
            let folioReceta = new Folio('',0,Global.RECETA,res.body.sucursal.identificador);
            let folioTicket = new Folio('',0,Global.TICKET,res.body.sucursal.identificador);
            this.folioService.addFolio(folioCarnet).subscribe();
            this.folioService.addFolio(folioReceta).subscribe();
            this.folioService.addFolio(folioTicket).subscribe();
            Swal.fire({
              icon:'success',
              title:'Se guardó con éxito la sucursal',
              timer:1500
            });
            this.limpiar();
            this.showSpinner = false;
            this.loadSucursales();
          }
        });
      }
    });
  }

  editar():void{
    Swal.fire({
      icon:'question',
      title:'Desea actualizar la sucursal '+this.sucursal.identificador+'?',
      showCancelButton:true,
      confirmButtonText:'Si'
    })
    .then(resultado=>{
      if(resultado.isConfirmed){
        this.showSpinner = true;
        this.sucursalService.updateSucursal(this.sucursal)
        .subscribe(res =>{
          if(res.body.sucursal){
            this.loadSucursales();
            this.showSpinner = false;
            this.limpiar();
            Swal.fire({
              icon:'success',
              title:'Se actualizó con éxito la sucursal',
              timer:1500
            });
          }
        })
      }
    });
  }

  deleteSucursal(index:number):void{
    Swal.fire({
      icon:'warning',
      title:'Desea eliminar la sucursal '+this.sucursales[index].identificador+'?',
      text: 'Eliminar una sucursal puede ocasionar perdida de información!',
      showCancelButton:true,
      confirmButtonText:'Si'
    })
    .then(resultado=>{
      if(resultado.isConfirmed){
        this.sucursalService.deleteSucursal(this.sucursales[index]._id)
        .subscribe(res=>{
          if(res.body.sucursal){
            this.loadSucursales();
            Swal.fire({
              icon:'success',
              title:'Se eliminó la sucursal',
              timer:1500
            });
          }
        });
      }
    })
  }

  seleccionar(index:number):void{
    this.sucursal = this.sucursales[index];
    this.btnAccion = Global.ACTUALIZAR;
  }

  limpiar():void{
    this.sucursal = {} as Sucursal;
    this.btnAccion = Global.AGREGAR;
  }
  

}
