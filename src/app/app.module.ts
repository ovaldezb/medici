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
import { EnrollComponent } from './components/enroll/enroll.component';
import { ConsultaEnfermedadComponent } from './components/consulta-enfermedad/consulta-enfermedad.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerModule } from '@angular/platform-browser';
import { IgxButtonModule, IgxCalendarModule, IgxDialogModule } from 'igniteui-angular';
import { DisponibilidadComponent } from './components/disponibilidad/disponibilidad.component';
import { CitasComponent } from './components/citas/citas.component';
import { HistoriaClinicaComponent } from './components/historia-clinica/historia-clinica.component';
import { RecetaComponent } from './components/receta/receta.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { AntecedentesFamiliaresComponent } from './components/antecedentes-familiares/antecedentes-familiares.component';
import { EnfermeriaMenuComponent } from './components/enfermeria-menu/enfermeria-menu.component';
import { ProductoComponent } from './components/producto/producto.component';
import { VentaComponent } from './components/venta/venta.component';
//I keep the new line
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
    SucursalesComponent,
    EnrollComponent,
    ConsultaEnfermedadComponent,
    AdministracionComponent,
    PacienteComponent,
    DisponibilidadComponent,
    CitasComponent,
    HistoriaClinicaComponent,
    RecetaComponent,
    PrintLayoutComponent,
    AntecedentesFamiliaresComponent,
    EnfermeriaMenuComponent,
    ProductoComponent,
    VentaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HammerModule,
    IgxCalendarModule,
    IgxButtonModule,
    IgxDialogModule

  ],
  providers: [appRoutingProvider, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCognitoInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
