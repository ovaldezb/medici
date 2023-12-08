import { Component, OnInit } from '@angular/core';
import { FarmaciaService } from 'src/app/service/farmacia.service';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css'],
  providers:[FarmaciaService]
})
export class FarmaciaComponent implements OnInit{
  
  constructor(private farmaciaService:FarmaciaService){}
  ngOnInit(): void {
    this.getMedicamentos();
  }

  getMedicamentos():any{
    this.farmaciaService.getMedicamentos('cefa')
    .subscribe(res=>{
      console.log(res);
    })
  }

}
