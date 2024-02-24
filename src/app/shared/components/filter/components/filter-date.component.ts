import { Component, Input } from '@angular/core';
import { FilterWrapperComponent } from '@shared/components/filter/components/filter-wrapper.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';

@Component({
  selector: 'tm-filter-date',
  styleUrls: ['../styles/filter-shared.sass', './filter-date.component.sass'],
  template: `
    <div class='itemContainer'>
      <button (click)='openDatepicker($event)' class='button'>
        <input class='input'
               (change)='handleSelectedValue($any($event.target).value)'
               type='date'
               [id]='itemId'
        >
        <ng-container *ngIf='value(); else placeholder'>
          {{ value() | date:dateFormat }}
        </ng-container>
        <ng-template #placeholder>
          {{ data.placeholder }}
        </ng-template>
      </button>
      <ng-container *ngIf='value()'>
        <tm-filter-delete-button (action)='clearValue()'></tm-filter-delete-button>
      </ng-container>
    </div>
  `,
})

export class FilterDateComponent extends FilterWrapperComponent<Date> {
  @Input() itemId: string;
  public readonly dateFormat = 'dd/MM';

  constructor(
    public readonly _activatedRoute: ActivatedRoute,
    public readonly _router: Router,
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
    super(_activatedRoute, _router);
  }

  public openDatepicker(event: MouseEvent) {
    event.preventDefault();
    const inputElement = document.getElementById(this.itemId);
    try {
      // @ts-ignore
      inputElement.showPicker();
    } catch (e) {
      this._loggerMessageService.errorMsg(e as Error, 'Something went wrong. Try again.');
    }
  }

  public clearValue(): void {
    this.value.set(null);
    this.updateRoute(null);
  }

  public handleSelectedValue(item: Date | string): void {
    this.value.set(new Date(item));
    this.updateRoute(item.toString());
  }

  protected loadValueFromQueryParam(params: Params): Date {
    return params[this.data.name] ? new Date(params[this.data.name]) : null;
  }
}
