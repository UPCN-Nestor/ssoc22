import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InsumoComponent } from './list/insumo.component';
import { InsumoDetailComponent } from './detail/insumo-detail.component';
import { InsumoUpdateComponent } from './update/insumo-update.component';
import { InsumoDeleteDialogComponent } from './delete/insumo-delete-dialog.component';
import { InsumoRoutingModule } from './route/insumo-routing.module';

@NgModule({
  imports: [SharedModule, InsumoRoutingModule],
  declarations: [InsumoComponent, InsumoDetailComponent, InsumoUpdateComponent, InsumoDeleteDialogComponent],
  entryComponents: [InsumoDeleteDialogComponent],
})
export class InsumoModule {}
