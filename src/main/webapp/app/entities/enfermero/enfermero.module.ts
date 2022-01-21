import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EnfermeroComponent } from './list/enfermero.component';
import { EnfermeroDetailComponent } from './detail/enfermero-detail.component';
import { EnfermeroUpdateComponent } from './update/enfermero-update.component';
import { EnfermeroDeleteDialogComponent } from './delete/enfermero-delete-dialog.component';
import { EnfermeroRoutingModule } from './route/enfermero-routing.module';

@NgModule({
  imports: [SharedModule, EnfermeroRoutingModule],
  declarations: [EnfermeroComponent, EnfermeroDetailComponent, EnfermeroUpdateComponent, EnfermeroDeleteDialogComponent],
  entryComponents: [EnfermeroDeleteDialogComponent],
})
export class EnfermeroModule {}
