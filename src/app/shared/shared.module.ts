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
import { TextareaComponent } from './components/textarea/textarea.component';
import { SelectComponent } from './components/select/select.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { FilterSelectComponent } from '@shared/components/filter/components/filter-select.component';
import { FilterDeleteButtonComponent } from '@shared/components/filter/components/filter-delete-button.component';
import { FilterDateComponent } from '@shared/components/filter/components/filter-date.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaginationComponent } from './components/pagination/pagination.component';

export function loggerFactory(): Logger {
  return new StageLoggerService();
}

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatProgressSpinnerModule],
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
    TextareaComponent,
    SelectComponent,
    ConfirmModalComponent,
    FilterComponent,
    FilterSelectComponent,
    FilterDeleteButtonComponent,
    FilterDateComponent,
    SpinnerComponent,
    PaginationComponent,
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
    TextareaComponent,
    SelectComponent,
    FilterComponent,
    PaginationComponent,
  ],
  providers: [
    StageLoggerService,
    { provide: Logger, useFactory: loggerFactory },
  ],
})
export class SharedModule {
}
