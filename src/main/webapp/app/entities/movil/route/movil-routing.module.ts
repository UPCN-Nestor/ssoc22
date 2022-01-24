import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MovilComponent } from '../list/movil.component';
import { MovilDetailComponent } from '../detail/movil-detail.component';
import { MovilUpdateComponent } from '../update/movil-update.component';
import { MovilRoutingResolveService } from './movil-routing-resolve.service';

const movilRoute: Routes = [
  {
    path: '',
    component: MovilComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MovilDetailComponent,
    resolve: {
      movil: MovilRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MovilUpdateComponent,
    resolve: {
      movil: MovilRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MovilUpdateComponent,
    resolve: {
      movil: MovilRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(movilRoute)],
  exports: [RouterModule],
})
export class MovilRoutingModule {}
