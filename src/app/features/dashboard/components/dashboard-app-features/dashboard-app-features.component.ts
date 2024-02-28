import { Component, signal } from '@angular/core';

interface IAppFeatures {
  title: string;
  imageSrc: string;
  description: string;
}

@Component({
  selector: 'app-dashboard-app-features',
  templateUrl: './dashboard-app-features.component.html',
  styleUrls: ['./dashboard-app-features.component.sass'],
})
export class DashboardAppFeaturesComponent {

  public arrayOfValues = signal<IAppFeatures[]>([
    {
      title: 'Tasks',
      imageSrc: '/assets/JpgExample.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      title: 'Leave workers',
      imageSrc: '/assets/JpgExample.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      title: 'Timer',
      imageSrc: '/assets/JpgExample.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ]);

  constructor() {
  }

}
