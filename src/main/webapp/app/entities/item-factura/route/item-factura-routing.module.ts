import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ItemFacturaComponent } from '../list/item-factura.component';
import { ItemFacturaDetailComponent } from '../detail/item-factura-detail.component';
import { ItemFacturaUpdateComponent } from '../update/item-factura-update.component';
import { ItemFacturaRoutingResolveService } from './item-factura-routing-resolve.service';

const itemFacturaRoute: Routes = [
  {
    path: '',
    component: ItemFacturaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ItemFacturaDetailComponent,
    resolve: {
      itemFactura: ItemFacturaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ItemFacturaUpdateComponent,
    resolve: {
      itemFactura: ItemFacturaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ItemFacturaUpdateComponent,
    resolve: {
      itemFactura: ItemFacturaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(itemFacturaRoute)],
  exports: [RouterModule],
})
export class ItemFacturaRoutingModule {}
