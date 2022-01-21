import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ChoferComponent } from './list/chofer.component';
import { ChoferDetailComponent } from './detail/chofer-detail.component';
import { ChoferUpdateComponent } from './update/chofer-update.component';
import { ChoferDeleteDialogComponent } from './delete/chofer-delete-dialog.component';
import { ChoferRoutingModule } from './route/chofer-routing.module';

@NgModule({
  imports: [SharedModule, ChoferRoutingModule],
  declarations: [ChoferComponent, ChoferDetailComponent, ChoferUpdateComponent, ChoferDeleteDialogComponent],
  entryComponents: [ChoferDeleteDialogComponent],
})
export class ChoferModule {}
