import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProvisionComponent } from './list/provision.component';
import { ProvisionDetailComponent } from './detail/provision-detail.component';
import { ProvisionUpdateComponent } from './update/provision-update.component';
import { ProvisionDeleteDialogComponent } from './delete/provision-delete-dialog.component';
import { ProvisionRoutingModule } from './route/provision-routing.module';

@NgModule({
  imports: [SharedModule, ProvisionRoutingModule],
  declarations: [ProvisionComponent, ProvisionDetailComponent, ProvisionUpdateComponent, ProvisionDeleteDialogComponent],
  entryComponents: [ProvisionDeleteDialogComponent],
})
export class ProvisionModule {}
