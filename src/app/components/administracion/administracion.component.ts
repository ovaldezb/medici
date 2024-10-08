import { Component } from '@angular/core';
import { Global } from 'src/app/service/Global';
import { faPills } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent {

  public tabActivo : string =Global.TAB_USUARIO;
  faPills = faPills;
  clickUsuario(tabNombre:string):void{
    this.tabActivo = tabNombre;
  }
}
