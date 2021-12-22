import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { IndividuoComponent } from './list/individuo.component';
import { IndividuoDetailComponent } from './detail/individuo-detail.component';
import { IndividuoUpdateComponent } from './update/individuo-update.component';
import { IndividuoDeleteDialogComponent } from './delete/individuo-delete-dialog.component';
import { IndividuoRoutingModule } from './route/individuo-routing.module';

@NgModule({
  imports: [SharedModule, IndividuoRoutingModule],
  declarations: [IndividuoComponent, IndividuoDetailComponent, IndividuoUpdateComponent, IndividuoDeleteDialogComponent],
  entryComponents: [IndividuoDeleteDialogComponent],
})
export class IndividuoModule {}
