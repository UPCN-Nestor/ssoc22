import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DespachoComponent } from '../list/despacho.component';
import { DespachoDetailComponent } from '../detail/despacho-detail.component';
import { DespachoUpdateComponent } from '../update/despacho-update.component';
import { DespachoRoutingResolveService } from './despacho-routing-resolve.service';

const despachoRoute: Routes = [
  {
    path: '',
    component: DespachoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DespachoDetailComponent,
    resolve: {
      despacho: DespachoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DespachoUpdateComponent,
    resolve: {
      despacho: DespachoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DespachoUpdateComponent,
    resolve: {
      despacho: DespachoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(despachoRoute)],
  exports: [RouterModule],
})
export class DespachoRoutingModule {}
