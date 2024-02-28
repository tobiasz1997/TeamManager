import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TimersPageComponent } from '@features/manager/timers/timers-page/timers-page.component';
import { TimerComponent } from '@features/manager/timers/timers-page/components/timer/timer.component';
import { TimersPageService } from '@features/manager/timers/timers-page/timers-page.service';
import { CommonModule, DatePipe } from '@angular/common';
import {
  TimerStylesColorDirective,
} from '@features/manager/timers/timers-page/components/timer/timer-styles-color.directive';
import {
  TimersHeaderComponent,
} from '@features/manager/timers/timers-page/components/timers-header/timers-header.component';
import {
  ManageTimerComponent,
} from '@features/manager/timers/timers-page/components/manage-timer/manage-timer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const TimersPageRoutes: Routes = [
  {
    path: '',
    component: TimersPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(TimersPageRoutes), SharedModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  declarations: [TimersPageComponent, TimerComponent, TimerStylesColorDirective, TimersHeaderComponent, ManageTimerComponent],
  providers: [TimersPageService, DatePipe],
})
export class TimersPageModule {
}
