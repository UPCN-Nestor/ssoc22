import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AdhesionComponent } from './list/adhesion.component';
import { AdhesionDetailComponent } from './detail/adhesion-detail.component';
import { AdhesionUpdateComponent } from './update/adhesion-update.component';
import { AdhesionDeleteDialogComponent } from './delete/adhesion-delete-dialog.component';
import { AdhesionRoutingModule } from './route/adhesion-routing.module';

@NgModule({
  imports: [SharedModule, AdhesionRoutingModule],
  declarations: [AdhesionComponent, AdhesionDetailComponent, AdhesionUpdateComponent, AdhesionDeleteDialogComponent],
  entryComponents: [AdhesionDeleteDialogComponent],
})
export class AdhesionModule {}
