import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProfilePageComponent } from '@features/manager/profile/profile-page.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfilePageService } from '@features/manager/profile/profile-page.service';
import { CommonModule } from '@angular/common';
import { ProfilePageRoutingModule } from '@features/manager/profile/profile-page-routing.module';

@NgModule({
  imports: [ProfilePageRoutingModule, SharedModule, CommonModule],
  declarations: [ProfilePageComponent, ProfileHeaderComponent],
  providers: [ProfilePageService],
})
export class ProfilePageModule {
}
