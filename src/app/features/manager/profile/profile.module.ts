import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutingModule } from '@features/manager/profile/profile-routing.module';
import { ProfileComponent } from '@features/manager/profile/profile.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileService } from '@features/manager/profile/profile.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ProfileRoutingModule, SharedModule, CommonModule],
  declarations: [ProfileComponent, ProfileHeaderComponent],
  providers: [ProfileService],
})
export class ProfileModule {
}
