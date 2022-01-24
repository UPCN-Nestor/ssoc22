import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MovimientoStockComponent } from './list/movimiento-stock.component';
import { MovimientoStockDetailComponent } from './detail/movimiento-stock-detail.component';
import { MovimientoStockUpdateComponent } from './update/movimiento-stock-update.component';
import { MovimientoStockDeleteDialogComponent } from './delete/movimiento-stock-delete-dialog.component';
import { MovimientoStockRoutingModule } from './route/movimiento-stock-routing.module';

@NgModule({
  imports: [SharedModule, MovimientoStockRoutingModule],
  declarations: [
    MovimientoStockComponent,
    MovimientoStockDetailComponent,
    MovimientoStockUpdateComponent,
    MovimientoStockDeleteDialogComponent,
  ],
  entryComponents: [MovimientoStockDeleteDialogComponent],
})
export class MovimientoStockModule {}
