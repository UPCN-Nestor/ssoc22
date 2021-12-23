import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ItemNomencladorComponent } from '../list/item-nomenclador.component';
import { ItemNomencladorDetailComponent } from '../detail/item-nomenclador-detail.component';
import { ItemNomencladorUpdateComponent } from '../update/item-nomenclador-update.component';
import { ItemNomencladorRoutingResolveService } from './item-nomenclador-routing-resolve.service';

const itemNomencladorRoute: Routes = [
  {
    path: '',
    component: ItemNomencladorComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ItemNomencladorDetailComponent,
    resolve: {
      itemNomenclador: ItemNomencladorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ItemNomencladorUpdateComponent,
    resolve: {
      itemNomenclador: ItemNomencladorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ItemNomencladorUpdateComponent,
    resolve: {
      itemNomenclador: ItemNomencladorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(itemNomencladorRoute)],
  exports: [RouterModule],
})
export class ItemNomencladorRoutingModule {}
