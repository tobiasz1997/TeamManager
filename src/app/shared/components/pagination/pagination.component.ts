import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { PAGE_NAME } from '@shared/constants/constant';

@Component({
  selector: 'tm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() itemCount: number;
  @Input() page: number;
  @Input() pageSize: number;
  @Output() setPage = new EventEmitter<number>();

  public numberOfPages = signal(0);

  private _destroy = new Subject<void>();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams
      .pipe(takeUntil(this._destroy))
      .subscribe(params => {
        this.page = params[PAGE_NAME] ? +params[PAGE_NAME] : 1;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.itemCount || changes.pageSize) {
      this.numberOfPages.set(Math.ceil(this.itemCount / this.pageSize));
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  public handlePageChange(page: number): void {
    this.updateRoute(page);
    this.setPage.next(page);
  }

  public updateRoute(page: number): void {
    void this._router.navigate(
      [],
      {
        relativeTo: this._activatedRoute,
        queryParams: { [PAGE_NAME]: page > 1 ? page : null },
        queryParamsHandling: 'merge',
      });
  };

}
