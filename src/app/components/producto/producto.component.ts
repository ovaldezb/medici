import { Component, OnInit } from '@angular/core';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import { saw } from '@igniteui/material-icons-extended';
import { Producto } from 'src/app/models/producto';
import { Global } from 'src/app/service/Global';
import { ProductoService } from 'src/app/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers:[ProductoService]
})
export class ProductoComponent implements OnInit{
  
  constructor(private productoService:ProductoService){}
  producto:Producto = new Producto('','','','U',0,0,0,0,'',0,true,0,0,0,'',new Date(),true);
  faPills = faPills;
  

  ngOnInit(): void {
    
  }

  altaProducto(){
    Swal.fire({
      titleText:'Está seguro de dar alta el producto?',
      showCancelButton:true,
      confirmButtonText:'Si'
    })
    .then(response=>{
      if(response.isConfirmed){
        this.productoService.addProducto(this.producto)
        .subscribe(res=>{
          console.log(res);
          if(res.status===Global.OK){
            Swal.fire({
              text:'El producto se agregó correctamente!',
              timer:Global.TIMER_OFF
            });
          }
        })
      }
    })
  }

}
