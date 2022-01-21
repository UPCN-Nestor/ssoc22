import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ChoferComponent } from '../list/chofer.component';
import { ChoferDetailComponent } from '../detail/chofer-detail.component';
import { ChoferUpdateComponent } from '../update/chofer-update.component';
import { ChoferRoutingResolveService } from './chofer-routing-resolve.service';

const choferRoute: Routes = [
  {
    path: '',
    component: ChoferComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChoferDetailComponent,
    resolve: {
      chofer: ChoferRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChoferUpdateComponent,
    resolve: {
      chofer: ChoferRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChoferUpdateComponent,
    resolve: {
      chofer: ChoferRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(choferRoute)],
  exports: [RouterModule],
})
export class ChoferRoutingModule {}
