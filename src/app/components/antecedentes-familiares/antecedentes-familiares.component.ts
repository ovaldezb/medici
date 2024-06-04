import { Component, OnInit } from '@angular/core';
import { PregresafService } from 'src/app/service/pregresaf.service';

@Component({
  selector: 'app-antecedentes-familiares',
  templateUrl: './antecedentes-familiares.component.html',
  styleUrls: ['./antecedentes-familiares.component.css'],
  providers:[PregresafService]
})
export class AntecedentesFamiliaresComponent implements OnInit {
  
  constructor(private pregresafService:PregresafService){}
  
  ngOnInit(): void {
    this.pregresafService.getAllPreguntas()
    .subscribe(res=>{
      console.log(res);
    })
  }

}
