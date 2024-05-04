import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EnfermeriaComponent } from "./components/enfermeria/enfermeria.component";
import { FarmaciaComponent } from "./components/farmacia/farmacia.component";
import { LoginComponent } from "./components/login/login.component";
import { MedicoComponent } from "./components/medico/medico.component";
import { RecepcionComponent } from "./components/recepcion/recepcion.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { PerfilesComponent } from "./components/perfiles/perfiles.component";
import { RouteGuardService } from "./service/route-guard.service";
import { ResetpwdComponent } from "./components/resetpwd/resetpwd.component";
import { SucursalesComponent } from "./components/sucursales/sucursales.component";
import { EnrollComponent } from "./components/enroll/enroll.component";
import { ConsultaEnfermedadComponent } from "./components/consulta-enfermedad/consulta-enfermedad.component";
import { AdministracionComponent } from "./components/administracion/administracion.component";
import { DisponibilidadComponent } from "./components/disponibilidad/disponibilidad.component";
import { HistoriaClinicaComponent } from "./components/historia-clinica/historia-clinica.component";

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recepcion', component: RecepcionComponent, canActivate:[RouteGuardService] },
  { path: 'medico', component: MedicoComponent, canActivate:[RouteGuardService] },
  { path: 'farmacia', component: FarmaciaComponent, canActivate:[RouteGuardService] },
  { path: 'enfermeria', component: EnfermeriaComponent, canActivate:[RouteGuardService]}, //
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'admon', component: AdministracionComponent, canActivate:[RouteGuardService]}, 
  { path: 'perfiles', component: PerfilesComponent, canActivate:[RouteGuardService] },
  { path: 'reset', component: ResetpwdComponent},
  { path: 'sucursal', component:SucursalesComponent, canActivate:[RouteGuardService] },
  { path: 'carnet', component: EnrollComponent },
  { path: 'consulta', component: ConsultaEnfermedadComponent, canActivate:[RouteGuardService] },
  { path: 'dispnibilidad', component: DisponibilidadComponent},
  { path: 'historial', component: HistoriaClinicaComponent}
];


export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);