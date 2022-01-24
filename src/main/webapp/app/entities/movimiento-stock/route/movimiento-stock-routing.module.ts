import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MovimientoStockComponent } from '../list/movimiento-stock.component';
import { MovimientoStockDetailComponent } from '../detail/movimiento-stock-detail.component';
import { MovimientoStockUpdateComponent } from '../update/movimiento-stock-update.component';
import { MovimientoStockRoutingResolveService } from './movimiento-stock-routing-resolve.service';

const movimientoStockRoute: Routes = [
  {
    path: '',
    component: MovimientoStockComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MovimientoStockDetailComponent,
    resolve: {
      movimientoStock: MovimientoStockRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MovimientoStockUpdateComponent,
    resolve: {
      movimientoStock: MovimientoStockRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MovimientoStockUpdateComponent,
    resolve: {
      movimientoStock: MovimientoStockRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(movimientoStockRoute)],
  exports: [RouterModule],
})
export class MovimientoStockRoutingModule {}
