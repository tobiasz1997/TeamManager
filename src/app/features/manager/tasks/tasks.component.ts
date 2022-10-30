import { Component, OnInit } from '@angular/core';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
})
export class TasksComponent implements OnInit {

  constructor(
    private readonly _loggerService: LoggerMessagesService,
  ) {
  }

  ngOnInit(): void {
  }

  public showError() {
    this._loggerService.successMsg('error bro');
  }

}
