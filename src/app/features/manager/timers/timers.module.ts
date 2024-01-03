import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TimersComponent } from '@features/manager/timers/timers.component';
import { TimersRoutingModule } from '@features/manager/timers/timers-routing.module';
import { TimerComponent } from './components/timer/timer.component';
import { TimersService } from '@features/manager/timers/timers.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TimerStylesColorDirective } from '@features/manager/timers/components/timer/timer-styles-color.directive';
import { TimersHeaderComponent } from './components/timers-header/timers-header.component';
import { ManageTimerComponent } from './components/manage-timer/manage-timer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [TimersRoutingModule, SharedModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  declarations: [TimersComponent, TimerComponent, TimerStylesColorDirective, TimersHeaderComponent, ManageTimerComponent],
  providers: [TimersService, DatePipe],
})
export class TimersModule {
}
