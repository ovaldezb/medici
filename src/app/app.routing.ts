import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdmomComponent } from "./components/admom/admom.component";
import { EnfermeriaComponent } from "./components/enfermeria/enfermeria.component";
import { FarmaciaComponent } from "./components/farmacia/farmacia.component";
import { LoginComponent } from "./components/login/login.component";
import { MedicoComponent } from "./components/medico/medico.component";
import { RecepcionComponent } from "./components/recepcion/recepcion.component";
//Import Component


const appRoutes: Routes = [
  { path:'', component: LoginComponent },
  { path:'recepcion', component: RecepcionComponent },
  { path:'medico', component: MedicoComponent },
  { path:'farmacia', component: FarmaciaComponent },
  { path:'enfermeria', component: EnfermeriaComponent},
  { path:'admon' , component: AdmomComponent }
];


export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);