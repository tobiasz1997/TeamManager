import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimersComponent } from '@features/manager/timers/timers.component';

const TimersRoutes: Routes = [
  {
    path: '',
    component: TimersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(TimersRoutes)],
  exports: [RouterModule],
})
export class TimersRoutingModule {
}
