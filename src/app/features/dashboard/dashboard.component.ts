import { animate, style, transition, trigger, useAnimation } from "@angular/animations";
import { Component } from '@angular/core';
import { CarouselAnimation } from "@shared/components/carousel/carousel.animation";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  animations: [CarouselAnimation.slideAnimation]
})
export class DashboardComponent {
  public indexOfArray = 0

  public arrayOfValues = [
    {value: 'test 1', color: '#c8d8e4'},
    {value: 'test 2', color: '#c8d8e4'},
    {value: 'test 3', color: '#c8d8e4'},
    {value: 'test 4', color: '#c8d8e4'},
  ]

  constructor() { }

  public increment() {
    this.indexOfArray = this.indexOfArray < 3 ? this.indexOfArray += 1 : 0;
  }

  public decrement() {
    this.indexOfArray = this.indexOfArray > 0 ? this.indexOfArray -= 1 : 3;
  }

}
