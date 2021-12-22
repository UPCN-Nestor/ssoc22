import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SubscripcionComponent } from './list/subscripcion.component';
import { SubscripcionDetailComponent } from './detail/subscripcion-detail.component';
import { SubscripcionUpdateComponent } from './update/subscripcion-update.component';
import { SubscripcionDeleteDialogComponent } from './delete/subscripcion-delete-dialog.component';
import { SubscripcionRoutingModule } from './route/subscripcion-routing.module';

@NgModule({
  imports: [SharedModule, SubscripcionRoutingModule],
  declarations: [SubscripcionComponent, SubscripcionDetailComponent, SubscripcionUpdateComponent, SubscripcionDeleteDialogComponent],
  entryComponents: [SubscripcionDeleteDialogComponent],
})
export class SubscripcionModule {}
