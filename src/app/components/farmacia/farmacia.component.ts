import { Component, OnInit } from '@angular/core';
import { FarmaciaService } from 'src/app/service/farmacia.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css'],
})
export class FarmaciaComponent {
  
  constructor(  ){}
  /*ngOnInit(): void {
    this.getMedicanmentoByCodigo();
    this.getMedicamentoByDesc();
  }

  getMedicanmentoByCodigo(){
    this.productoService.findProductoByCodigoBarras('123456')
    .subscribe(res=>{
      console.log(res);
    });
  }

  getMedicamentoByDesc(){
    this.productoService.findProductoByDesc('ampi')
    .subscribe(res=>{
      console.log(res);
    });
  }

  getMedicamentos():any{
    this.farmaciaService.getMedicamentos('cefa')
    .subscribe(res=>{
      console.log(res);
    })
  }*/

}
