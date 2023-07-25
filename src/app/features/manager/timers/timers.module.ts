import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TimersComponent } from '@features/manager/timers/timers.component';
import { TimersRoutingModule } from '@features/manager/timers/timers-routing.module';
import { TimerComponent } from './components/timer/timer.component';
import { TimersService } from '@features/manager/timers/timers.service';
import { CommonModule } from '@angular/common';
import { TimerStylesColorDirective } from '@features/manager/timers/components/timer/timer-styles-color.directive';

@NgModule({
  imports: [TimersRoutingModule, SharedModule, CommonModule],
  declarations: [TimersComponent, TimerComponent, TimerStylesColorDirective],
  providers: [TimersService],
})
export class TimersModule {
}
