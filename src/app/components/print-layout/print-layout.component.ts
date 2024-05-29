import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/models/citas';
import { Global } from 'src/app/service/Global';
import { CitasService } from 'src/app/service/citas.service';
import { PrintService } from 'src/app/service/print.service';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css'],
  providers:[CitasService]
})
export class PrintLayoutComponent implements OnInit {
  public faWhatsapp = faWhatsapp;
  public idCita: string = '';
  public cita:Cita= {} as Cita;
  constructor(route: ActivatedRoute, private citasService: CitasService, private printService: PrintService){
    //this.cita.medicamentoReceta = route.snapshot.params.medicamentoReceta;
    this.idCita = route.snapshot.params['idCita'];
    //console.log(this.cita.medicamentoReceta);
  }
  
  ngOnInit(): void {
    this.citasService.getCitaById(this.idCita)
    .subscribe(res=>{
      //console.log(res.body);
      if(res.status === Global.OK && res.body!=null){
        this.cita = res.body.citas;
        this.printService.onDataReady();
      }
    });
    
  }
}
