import { Component } from '@angular/core';
import { Global } from 'src/app/service/Global';



@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})

export class RecepcionComponent {
  public tabActivo : string =Global.TAB_CITAS;
  
  clickUsuario(tabNombre:string):void{
    this.tabActivo = tabNombre;
  }
  
}
