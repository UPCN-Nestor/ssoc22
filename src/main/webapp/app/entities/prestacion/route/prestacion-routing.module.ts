import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PrestacionComponent } from '../list/prestacion.component';
import { PrestacionDetailComponent } from '../detail/prestacion-detail.component';
import { PrestacionUpdateComponent } from '../update/prestacion-update.component';
import { PrestacionRoutingResolveService } from './prestacion-routing-resolve.service';

const prestacionRoute: Routes = [
  {
    path: '',
    component: PrestacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PrestacionDetailComponent,
    resolve: {
      prestacion: PrestacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PrestacionUpdateComponent,
    resolve: {
      prestacion: PrestacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PrestacionUpdateComponent,
    resolve: {
      prestacion: PrestacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(prestacionRoute)],
  exports: [RouterModule],
})
export class PrestacionRoutingModule {}
