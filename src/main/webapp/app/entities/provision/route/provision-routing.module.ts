import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProvisionComponent } from '../list/provision.component';
import { ProvisionDetailComponent } from '../detail/provision-detail.component';
import { ProvisionUpdateComponent } from '../update/provision-update.component';
import { ProvisionRoutingResolveService } from './provision-routing-resolve.service';

const provisionRoute: Routes = [
  {
    path: '',
    component: ProvisionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProvisionDetailComponent,
    resolve: {
      provision: ProvisionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProvisionUpdateComponent,
    resolve: {
      provision: ProvisionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProvisionUpdateComponent,
    resolve: {
      provision: ProvisionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(provisionRoute)],
  exports: [RouterModule],
})
export class ProvisionRoutingModule {}
