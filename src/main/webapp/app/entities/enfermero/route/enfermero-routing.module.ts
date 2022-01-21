import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EnfermeroComponent } from '../list/enfermero.component';
import { EnfermeroDetailComponent } from '../detail/enfermero-detail.component';
import { EnfermeroUpdateComponent } from '../update/enfermero-update.component';
import { EnfermeroRoutingResolveService } from './enfermero-routing-resolve.service';

const enfermeroRoute: Routes = [
  {
    path: '',
    component: EnfermeroComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EnfermeroDetailComponent,
    resolve: {
      enfermero: EnfermeroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EnfermeroUpdateComponent,
    resolve: {
      enfermero: EnfermeroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EnfermeroUpdateComponent,
    resolve: {
      enfermero: EnfermeroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(enfermeroRoute)],
  exports: [RouterModule],
})
export class EnfermeroRoutingModule {}
