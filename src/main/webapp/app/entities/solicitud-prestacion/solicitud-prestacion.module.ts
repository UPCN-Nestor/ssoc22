import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SolicitudPrestacionComponent } from './list/solicitud-prestacion.component';
import { SolicitudPrestacionDetailComponent } from './detail/solicitud-prestacion-detail.component';
import { SolicitudPrestacionUpdateComponent } from './update/solicitud-prestacion-update.component';
import { SolicitudPrestacionDeleteDialogComponent } from './delete/solicitud-prestacion-delete-dialog.component';
import { SolicitudPrestacionRoutingModule } from './route/solicitud-prestacion-routing.module';

@NgModule({
  imports: [SharedModule, SolicitudPrestacionRoutingModule],
  declarations: [
    SolicitudPrestacionComponent,
    SolicitudPrestacionDetailComponent,
    SolicitudPrestacionUpdateComponent,
    SolicitudPrestacionDeleteDialogComponent,
  ],
  entryComponents: [SolicitudPrestacionDeleteDialogComponent],
})
export class SolicitudPrestacionModule {}
