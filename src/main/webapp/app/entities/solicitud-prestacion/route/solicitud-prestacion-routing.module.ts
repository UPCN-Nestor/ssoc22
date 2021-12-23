import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SolicitudPrestacionComponent } from '../list/solicitud-prestacion.component';
import { SolicitudPrestacionDetailComponent } from '../detail/solicitud-prestacion-detail.component';
import { SolicitudPrestacionUpdateComponent } from '../update/solicitud-prestacion-update.component';
import { SolicitudPrestacionRoutingResolveService } from './solicitud-prestacion-routing-resolve.service';

const solicitudPrestacionRoute: Routes = [
  {
    path: '',
    component: SolicitudPrestacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SolicitudPrestacionDetailComponent,
    resolve: {
      solicitudPrestacion: SolicitudPrestacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SolicitudPrestacionUpdateComponent,
    resolve: {
      solicitudPrestacion: SolicitudPrestacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SolicitudPrestacionUpdateComponent,
    resolve: {
      solicitudPrestacion: SolicitudPrestacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(solicitudPrestacionRoute)],
  exports: [RouterModule],
})
export class SolicitudPrestacionRoutingModule {}
