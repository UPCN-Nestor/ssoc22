import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { IndividuoComponent } from '../list/individuo.component';
import { IndividuoDetailComponent } from '../detail/individuo-detail.component';
import { IndividuoUpdateComponent } from '../update/individuo-update.component';
import { IndividuoRoutingResolveService } from './individuo-routing-resolve.service';

const individuoRoute: Routes = [
  {
    path: '',
    component: IndividuoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: IndividuoDetailComponent,
    resolve: {
      individuo: IndividuoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: IndividuoUpdateComponent,
    resolve: {
      individuo: IndividuoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: IndividuoUpdateComponent,
    resolve: {
      individuo: IndividuoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(individuoRoute)],
  exports: [RouterModule],
})
export class IndividuoRoutingModule {}
