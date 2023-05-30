import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EnfermeriaComponent } from "./components/enfermeria/enfermeria.component";
import { FarmaciaComponent } from "./components/farmacia/farmacia.component";
import { LoginComponent } from "./components/login/login.component";
import { MedicoComponent } from "./components/medico/medico.component";
import { RecepcionComponent } from "./components/recepcion/recepcion.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { PerfilesComponent } from "./components/perfiles/perfiles.component";
import { RouteGuardService } from "./service/route-guard.service";
//Import Component


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recepcion', component: RecepcionComponent, canActivate:[RouteGuardService] },
  { path: 'medico', component: MedicoComponent, canActivate:[RouteGuardService] },
  { path: 'farmacia', component: FarmaciaComponent, canActivate:[RouteGuardService] },
  { path: 'enfermeria', component: EnfermeriaComponent, canActivate:[RouteGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'registro', component: RegistroComponent}, //, canActivate:[RouteGuardService]
  { path: 'perfiles', component: PerfilesComponent, canActivate:[RouteGuardService] }
];


export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);