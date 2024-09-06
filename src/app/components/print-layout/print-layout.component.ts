import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/models/citas';
import { Global } from 'src/app/service/Global';
import { CitasService } from 'src/app/service/citas.service';
import { PrintService } from 'src/app/service/print.service';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css'],
  providers:[CitasService]
})
export class PrintLayoutComponent implements OnInit, OnChanges {
  public faWhatsapp = faWhatsapp;
  public idCita: string = '';
  public cita:Cita= {} as Cita;
  public fechaHoy : String='';
  public edad:number=0;
  constructor(route: ActivatedRoute, private citasService: CitasService, private printService: PrintService){
    this.idCita = route.snapshot.params['idCita'];
  }
  
  ngOnInit(): void {
    this.fechaHoy = moment().format('DD/MM/YYYY');
    this.citasService.getCitaById(this.idCita)
    .subscribe(res=>{
      if(res.status === Global.OK && res.body!=null){
        this.cita = res.body.citas;
        this.edad = moment().diff(this.cita.paciente.fechaNacimiento,'years');
        this.printService.onDataReady();
      }
    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.cita != null && this.cita != undefined)
      this.edad = moment().diff(this.cita.paciente.fechaNacimiento,'years');
  }
}
