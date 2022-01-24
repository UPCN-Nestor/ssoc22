import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ItemFacturaComponent } from './list/item-factura.component';
import { ItemFacturaDetailComponent } from './detail/item-factura-detail.component';
import { ItemFacturaUpdateComponent } from './update/item-factura-update.component';
import { ItemFacturaDeleteDialogComponent } from './delete/item-factura-delete-dialog.component';
import { ItemFacturaRoutingModule } from './route/item-factura-routing.module';

@NgModule({
  imports: [SharedModule, ItemFacturaRoutingModule],
  declarations: [ItemFacturaComponent, ItemFacturaDetailComponent, ItemFacturaUpdateComponent, ItemFacturaDeleteDialogComponent],
  entryComponents: [ItemFacturaDeleteDialogComponent],
})
export class ItemFacturaModule {}
