import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InsumoComponent } from '../list/insumo.component';
import { InsumoDetailComponent } from '../detail/insumo-detail.component';
import { InsumoUpdateComponent } from '../update/insumo-update.component';
import { InsumoRoutingResolveService } from './insumo-routing-resolve.service';

const insumoRoute: Routes = [
  {
    path: '',
    component: InsumoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InsumoDetailComponent,
    resolve: {
      insumo: InsumoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InsumoUpdateComponent,
    resolve: {
      insumo: InsumoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InsumoUpdateComponent,
    resolve: {
      insumo: InsumoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(insumoRoute)],
  exports: [RouterModule],
})
export class InsumoRoutingModule {}
