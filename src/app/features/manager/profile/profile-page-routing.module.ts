import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from '@features/manager/profile/profile-page.component';

const ProfilePageRoutes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ProfilePageRoutes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {
}
