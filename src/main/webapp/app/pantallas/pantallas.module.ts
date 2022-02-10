import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallaTelefonistaComponent } from './pantalla-telefonista/pantalla-telefonista.component';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SharedModule } from 'app/shared/shared.module';
import { SolicitudPrestacionAltaComponent } from './solicitud-prestacion-alta/solicitud-prestacion-alta.component';
import { SolicitudPrestacionBonoComponent } from './solicitud-prestacion-bono/solicitud-prestacion-bono.component';
import { PlanAltaComponent } from './plan-alta/plan-alta.component';

const pantallasRoute: Routes = [
  {
    path: 'telefono',
    component: PantallaTelefonistaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'solicitud-prestacion-alta/:tipo',
    component: SolicitudPrestacionAltaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'solicitud-prestacion-bono',
    component: SolicitudPrestacionBonoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'plan-alta',
    component: PlanAltaComponent,
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [PantallaTelefonistaComponent, SolicitudPrestacionAltaComponent, SolicitudPrestacionBonoComponent, PlanAltaComponent],
  imports: [SharedModule, RouterModule.forChild(pantallasRoute), CommonModule],
  exports: [RouterModule],
})
export class PantallasModule {}
