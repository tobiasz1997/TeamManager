import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutingModule } from '@features/manager/profile/profile-routing.module';
import { ProfileComponent } from '@features/manager/profile/profile.component';

@NgModule({
  imports: [ProfileRoutingModule, SharedModule],
  declarations: [ProfileComponent],
})
export class ProfileModule {
}
