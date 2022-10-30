import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Logger } from '@shared/services/logger.abstract';
import { StageLoggerService } from '@shared/services/stage-logger.service';
import { ButtonComponent } from './components/button/button.component';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ScrollTopButtonComponent } from './components/scroll-top-button/scroll-top-button.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { LinkComponent } from './components/link/link.component';
import { ToastComponent } from './components/toast/toast.component';
import { InputComponent } from './components/input/input.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { ProfilePanelComponent } from '@shared/components/header/components/profile-panel/profile-panel.component';

export function loggerFactory(): Logger {
  return new StageLoggerService();
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonComponent,
    FirstLetterUppercasePipe,
    CarouselComponent,
    ScrollTopButtonComponent,
    BackButtonComponent,
    LinkComponent,
    ToastComponent,
    InputComponent,
    ClickOutsideDirective,
    ButtonIconComponent,
    ProfilePanelComponent,
  ],
  exports: [
    ButtonComponent,
    CarouselComponent,
    ScrollTopButtonComponent,
    BackButtonComponent,
    LinkComponent,
    ToastComponent,
    InputComponent,
    ClickOutsideDirective,
    ButtonIconComponent,
    ProfilePanelComponent,
    FirstLetterUppercasePipe,
  ],
  providers: [
    StageLoggerService,
    { provide: Logger, useFactory: loggerFactory },
  ],
})
export class SharedModule {
}
