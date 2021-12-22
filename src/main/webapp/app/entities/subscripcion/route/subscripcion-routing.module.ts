import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SubscripcionComponent } from '../list/subscripcion.component';
import { SubscripcionDetailComponent } from '../detail/subscripcion-detail.component';
import { SubscripcionUpdateComponent } from '../update/subscripcion-update.component';
import { SubscripcionRoutingResolveService } from './subscripcion-routing-resolve.service';

const subscripcionRoute: Routes = [
  {
    path: '',
    component: SubscripcionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubscripcionDetailComponent,
    resolve: {
      subscripcion: SubscripcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubscripcionUpdateComponent,
    resolve: {
      subscripcion: SubscripcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubscripcionUpdateComponent,
    resolve: {
      subscripcion: SubscripcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(subscripcionRoute)],
  exports: [RouterModule],
})
export class SubscripcionRoutingModule {}
