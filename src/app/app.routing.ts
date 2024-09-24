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
import { RecetaComponent } from "./components/receta/receta.component";
import { PrintLayoutComponent } from "./components/print-layout/print-layout.component";
import { EnfermeriaMenuComponent } from "./components/enfermeria-menu/enfermeria-menu.component";
import { InterconsultaComponent } from "./components/interconsulta/interconsulta.component";
import { MedicamentoComponent } from "./components/medicamento/medicamento.component";

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recepcion', component: RecepcionComponent, canActivate:[RouteGuardService] },
  { path: 'medico', component: MedicoComponent, canActivate:[RouteGuardService] },
  { path: 'farmacia', component: FarmaciaComponent, canActivate:[RouteGuardService] },
  { path: 'enfermeria', component: EnfermeriaMenuComponent, canActivate:[RouteGuardService]}, //
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'admon', component: AdministracionComponent, canActivate:[RouteGuardService]}, 
  { path: 'perfiles', component: PerfilesComponent, canActivate:[RouteGuardService] },
  { path: 'reset', component: ResetpwdComponent},
  { path: 'sucursal', component:SucursalesComponent, canActivate:[RouteGuardService] },
  { path: 'carnet', component: EnrollComponent,canActivate:[RouteGuardService] },
  { path: 'consulta', component: ConsultaEnfermedadComponent, canActivate:[RouteGuardService] },
  { path: 'dispnibilidad', component: DisponibilidadComponent, canActivate:[RouteGuardService]},
  { path: 'farmacia', component: FarmaciaComponent, canActivate:[RouteGuardService]},
  { path: 'historial', component: HistoriaClinicaComponent},
  { path: 'print/:idCita', outlet:'print',component: PrintLayoutComponent },
  { path: 'medicamento', component:MedicamentoComponent,canActivate:[RouteGuardService]},
  { path: 'interconsulta',component:InterconsultaComponent,canActivate:[RouteGuardService]}
];


export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);