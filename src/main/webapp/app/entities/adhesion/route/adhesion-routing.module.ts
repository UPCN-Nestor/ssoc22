import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AdhesionComponent } from '../list/adhesion.component';
import { AdhesionDetailComponent } from '../detail/adhesion-detail.component';
import { AdhesionUpdateComponent } from '../update/adhesion-update.component';
import { AdhesionRoutingResolveService } from './adhesion-routing-resolve.service';

const adhesionRoute: Routes = [
  {
    path: '',
    component: AdhesionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AdhesionDetailComponent,
    resolve: {
      adhesion: AdhesionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AdhesionUpdateComponent,
    resolve: {
      adhesion: AdhesionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AdhesionUpdateComponent,
    resolve: {
      adhesion: AdhesionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adhesionRoute)],
  exports: [RouterModule],
})
export class AdhesionRoutingModule {}
