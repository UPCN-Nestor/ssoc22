import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReglaPrestacionComponent } from './list/regla-prestacion.component';
import { ReglaPrestacionDetailComponent } from './detail/regla-prestacion-detail.component';
import { ReglaPrestacionUpdateComponent } from './update/regla-prestacion-update.component';
import { ReglaPrestacionDeleteDialogComponent } from './delete/regla-prestacion-delete-dialog.component';
import { ReglaPrestacionRoutingModule } from './route/regla-prestacion-routing.module';

@NgModule({
  imports: [SharedModule, ReglaPrestacionRoutingModule],
  declarations: [
    ReglaPrestacionComponent,
    ReglaPrestacionDetailComponent,
    ReglaPrestacionUpdateComponent,
    ReglaPrestacionDeleteDialogComponent,
  ],
  entryComponents: [ReglaPrestacionDeleteDialogComponent],
})
export class ReglaPrestacionModule {}
