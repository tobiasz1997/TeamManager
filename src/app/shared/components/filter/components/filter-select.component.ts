import { Component } from '@angular/core';
import { IOption } from '@shared/interfaces/option.interface';
import { FilterWrapperComponent } from '@shared/components/filter/components/filter-wrapper.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'tm-filter-select',
  styleUrls: ['./filter-select.component.sass', '../styles/filter-shared.sass'],
  template: `
    <div class='itemContainer'
         csClickOutside
         [isActive]='isDropdownVisible'
         (clickOutside)='isDropdownVisible = false'
    >
      <button class='button' (click)='isDropdownVisible = !isDropdownVisible'>
        <ng-container *ngIf='value; else placeholder'>
          {{ value.label }}
        </ng-container>
        <ng-template #placeholder>
          {{ data.placeholder }}
        </ng-template>
      </button>
      <ng-container *ngIf='value'>
        <tm-filter-delete-button (action)='clearValue()'></tm-filter-delete-button>
      </ng-container>
      <div *ngIf='isDropdownVisible' class='select'>
        <ng-container *ngFor='let item of data.options'>
          <div class='select__item' (click)='handleSelectedValue(item)'>{{ item.label }}</div>
        </ng-container>
      </div>
    </div>
  `,
})
export class FilterSelectComponent extends FilterWrapperComponent<IOption<any>> {
  public isDropdownVisible = false;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
  ) {
    super(_activatedRoute, _router);
  }

  public handleSelectedValue(item: IOption<any>): void {
    this.value = item;
    this.updateRoute(item.value);
    this.isDropdownVisible = false;
  }

  public clearValue(): void {
    this.value = null;
    this.updateRoute(null);
  }

  protected loadValueFromQueryParam(params: Params): IOption<any> {
    return this.data.options.find(x => x.value === params[this.data.name]);
  }
}
