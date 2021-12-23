import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DespachoComponent } from './list/despacho.component';
import { DespachoDetailComponent } from './detail/despacho-detail.component';
import { DespachoUpdateComponent } from './update/despacho-update.component';
import { DespachoDeleteDialogComponent } from './delete/despacho-delete-dialog.component';
import { DespachoRoutingModule } from './route/despacho-routing.module';

@NgModule({
  imports: [SharedModule, DespachoRoutingModule],
  declarations: [DespachoComponent, DespachoDetailComponent, DespachoUpdateComponent, DespachoDeleteDialogComponent],
  entryComponents: [DespachoDeleteDialogComponent],
})
export class DespachoModule {}
