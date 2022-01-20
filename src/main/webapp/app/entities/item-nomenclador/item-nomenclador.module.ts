import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ItemNomencladorComponent } from './list/item-nomenclador.component';
import { ItemNomencladorDetailComponent } from './detail/item-nomenclador-detail.component';
import { ItemNomencladorUpdateComponent } from './update/item-nomenclador-update.component';
import { ItemNomencladorDeleteDialogComponent } from './delete/item-nomenclador-delete-dialog.component';
import { ItemNomencladorRoutingModule } from './route/item-nomenclador-routing.module';

@NgModule({
  imports: [SharedModule, ItemNomencladorRoutingModule],
  declarations: [
    ItemNomencladorComponent,
    ItemNomencladorDetailComponent,
    ItemNomencladorUpdateComponent,
    ItemNomencladorDeleteDialogComponent,
  ],
  entryComponents: [ItemNomencladorDeleteDialogComponent],
})
export class ItemNomencladorModule {}
