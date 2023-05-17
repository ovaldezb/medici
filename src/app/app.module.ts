import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RecepcionComponent } from './components/recepcion/recepcion.component';
import { MedicoComponent } from './components/medico/medico.component';
import { FarmaciaComponent } from './components/farmacia/farmacia.component';
import { EnfermeriaComponent } from './components/enfermeria/enfermeria.component';
import { FormsModule } from '@angular/forms';
import { appRoutingProvider, routing } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { AdmomComponent } from './components/admom/admom.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PesograficaComponent } from './components/pesografica/pesografica.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    RecepcionComponent,
    MedicoComponent,
    FarmaciaComponent,
    EnfermeriaComponent,
    LoginComponent,
    AdmomComponent,
    PesograficaComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    FontAwesomeModule
  ],
  providers: [appRoutingProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
