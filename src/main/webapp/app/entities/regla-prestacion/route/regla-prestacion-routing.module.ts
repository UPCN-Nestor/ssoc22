import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ReglaPrestacionComponent } from '../list/regla-prestacion.component';
import { ReglaPrestacionDetailComponent } from '../detail/regla-prestacion-detail.component';
import { ReglaPrestacionUpdateComponent } from '../update/regla-prestacion-update.component';
import { ReglaPrestacionRoutingResolveService } from './regla-prestacion-routing-resolve.service';

const reglaPrestacionRoute: Routes = [
  {
    path: '',
    component: ReglaPrestacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReglaPrestacionDetailComponent,
    resolve: {
      reglaPrestacion: ReglaPrestacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReglaPrestacionUpdateComponent,
    resolve: {
      reglaPrestacion: ReglaPrestacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReglaPrestacionUpdateComponent,
    resolve: {
      reglaPrestacion: ReglaPrestacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(reglaPrestacionRoute)],
  exports: [RouterModule],
})
export class ReglaPrestacionRoutingModule {}
