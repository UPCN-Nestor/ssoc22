import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MovilComponent } from './list/movil.component';
import { MovilDetailComponent } from './detail/movil-detail.component';
import { MovilUpdateComponent } from './update/movil-update.component';
import { MovilDeleteDialogComponent } from './delete/movil-delete-dialog.component';
import { MovilRoutingModule } from './route/movil-routing.module';

@NgModule({
  imports: [SharedModule, MovilRoutingModule],
  declarations: [MovilComponent, MovilDetailComponent, MovilUpdateComponent, MovilDeleteDialogComponent],
  entryComponents: [MovilDeleteDialogComponent],
})
export class MovilModule {}
