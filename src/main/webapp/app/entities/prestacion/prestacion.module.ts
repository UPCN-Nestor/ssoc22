import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PrestacionComponent } from './list/prestacion.component';
import { PrestacionDetailComponent } from './detail/prestacion-detail.component';
import { PrestacionUpdateComponent } from './update/prestacion-update.component';
import { PrestacionDeleteDialogComponent } from './delete/prestacion-delete-dialog.component';
import { PrestacionRoutingModule } from './route/prestacion-routing.module';

@NgModule({
  imports: [SharedModule, PrestacionRoutingModule],
  declarations: [PrestacionComponent, PrestacionDetailComponent, PrestacionUpdateComponent, PrestacionDeleteDialogComponent],
  entryComponents: [PrestacionDeleteDialogComponent],
})
export class PrestacionModule {}
