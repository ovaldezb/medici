import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Cita } from 'src/app/models/citas';
import * as moment from 'moment';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit, OnChanges{
  public fechaHoy : String='';
  public edad:number=0;
  @Input() cita:Cita= {} as Cita;
  
  
  ngOnInit(): void {
    this.fechaHoy = moment().format('DD-MM-YYYY');
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.cita);
    if(this.cita != null && this.cita != undefined)
      this.edad = moment().diff(this.cita.paciente.fechaNacimiento,'years');
  }
  

}
