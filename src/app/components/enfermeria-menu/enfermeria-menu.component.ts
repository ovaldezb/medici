import { Component } from '@angular/core';
import { Global } from 'src/app/service/Global';

@Component({
  selector: 'app-enfermeria-menu',
  templateUrl: './enfermeria-menu.component.html',
  styleUrls: ['./enfermeria-menu.component.css']
})
export class EnfermeriaMenuComponent {

  public tabActivo = Global.TAB_ENFERMERIA;

  clickUsuario(tabNombre:string):void{
    this.tabActivo = tabNombre;
  }

}
