import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '@features/manager/profile/profile.component';

const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ProfileRoutes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
