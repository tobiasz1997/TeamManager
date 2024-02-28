import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tm-load-more-button',
  templateUrl: './load-more-button.component.html',
  styleUrls: ['./load-more-button.component.sass'],
})
export class LoadMoreButtonComponent {
  @Output() onLoad = new EventEmitter<void>();

  public onLoadMore(): void {
    this.onLoad.next();
  }
}
