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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PesograficaComponent } from './components/pesografica/pesografica.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HeaderComponent } from './components/header/header.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { HttpCognitoInterceptorService } from './service/http-cognito-interceptor.service';
import { ResetpwdComponent } from './components/resetpwd/resetpwd.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';



@NgModule({
  declarations: [
    AppComponent,
    RecepcionComponent,
    MedicoComponent,
    FarmaciaComponent,
    EnfermeriaComponent,
    LoginComponent,
    PesograficaComponent,
    LogoutComponent,
    HeaderComponent,
    RegistroComponent,
    PerfilesComponent,
    ResetpwdComponent,
    SucursalesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    FontAwesomeModule
  ],
  providers: [appRoutingProvider,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCognitoInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
