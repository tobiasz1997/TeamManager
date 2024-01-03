import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IFilterItem } from '@shared/components/filter/filter.component';
import { take } from 'rxjs';
import { PAGE_NAME } from '@shared/constants/constant';

@Component({
  selector: 'tm-filter-wrapper',
  template: '',
})
export abstract class FilterWrapperComponent<TItem = unknown> implements OnInit {
  @Input() data: IFilterItem;
  public value: TItem;

  protected constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(take(1))
      .subscribe((params) => {
        this.value = this.loadValueFromQueryParam(params);
      });
  }

  public abstract clearValue(): void;

  public abstract handleSelectedValue(item: TItem): void;

  protected abstract loadValueFromQueryParam(params: Params): TItem;

  protected updateRoute(value: string | null): void {
    void this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { [this.data.name]: value, [PAGE_NAME]: null },
        queryParamsHandling: 'merge',
      });
  };
}
