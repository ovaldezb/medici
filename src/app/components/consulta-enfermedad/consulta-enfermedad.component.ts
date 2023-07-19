import { Component } from '@angular/core';
import { Enfermedad } from 'src/app/models/enfermedad';
import { ConsultaService } from 'src/app/service/consulta.service';

@Component({
  selector: 'app-consulta-enfermedad',
  templateUrl: './consulta-enfermedad.component.html',
  styleUrls: ['./consulta-enfermedad.component.css'],
  providers:[ConsultaService]
})
export class ConsultaEnfermedadComponent {

  public listaSintomas:String[]=[];
  public listEnfermedades: Enfermedad[]=[];
  public enfermedad:Enfermedad={} as Enfermedad;
  public isLoading:boolean = false;

  constructor(private consultaService:ConsultaService){}

  consultaEnfermedad():void{
    if(this.listEnfermedades.length ===0 && this.listaSintomas.length===0 ){
      this.isLoading = true;
      this.consultaService
      .getPatologia(this.enfermedad.sintomas)
      .subscribe(res=>{
        this.listaSintomas.push(this.enfermedad.sintomas);
        this.enfermedad.sintomas='';
        this.isLoading = false;
        if(res.body!=null && res.body.enfermedades.length > 0){
          this.listEnfermedades = res.body.enfermedades;
        }
      })
    }else{
      const filtered = this.listEnfermedades.filter(item => item.sintomas.includes(this.enfermedad.sintomas)) ;
      this.listEnfermedades = filtered;
      this.listaSintomas.push(this.enfermedad.sintomas);
      this.enfermedad.sintomas='';
    }
    
  }

  limpiar():void{
    this.listEnfermedades = [];
    this.listaSintomas = [];
  }
}
