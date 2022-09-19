import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggerMessageEnum } from "@shared/enums/logger-message.enum";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.sass']
})
export class ToastComponent {
  @Input() message = '';
  @Input() type: LoggerMessageEnum = LoggerMessageEnum.Info;
  @Output() closeLoggerClick$ = new EventEmitter<void>();

  public loggerType = LoggerMessageEnum;

  constructor() { }

  public handleClose(): void {
    this.closeLoggerClick$.emit();
  }

}
