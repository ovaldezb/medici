import { Component, OnInit } from '@angular/core';


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

  }*/

}
