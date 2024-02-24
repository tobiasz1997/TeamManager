import { Component, signal } from '@angular/core';
import { CarouselAnimation } from '@shared/components/carousel/carousel.animation';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass'],
  animations: [CarouselAnimation.slideAnimation],
})
export class DashboardPageComponent {
  public indexOfArray = signal(0);

  public arrayOfValues = [
    { value: 'test 1', color: '#c8d8e4' },
    { value: 'test 2', color: '#c8d8e4' },
    { value: 'test 3', color: '#c8d8e4' },
    { value: 'test 4', color: '#c8d8e4' },
  ];

  public increment() {
    this.indexOfArray.update(value => value < this.arrayOfValues.length - 1 ? value + 1 : 0);
  }

  public decrement() {
    this.indexOfArray.update(value => value > 0 ? value - 1 : this.arrayOfValues.length - 1);
  }
}
