import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard-welcome',
  templateUrl: './dashboard-welcome.component.html',
  styleUrls: ['./dashboard-welcome.component.sass'],
  animations: [
    trigger('myTrigger', [
      transition(
        ':enter',
        [
          style({ opacity: 0, bottom: '-40px' }),
          animate('1s ease-in',
            style({ opacity: 1, bottom: '0' })),
        ],
      ),
      transition(
        ':leave',
        [
          animate('1s ease-in',
            style({ opacity: 0, bottom: '+40px' })),
        ],
      ),
    ]),
  ],
})
export class DashboardWelcomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public appFeatures = signal<string | null>('');

  private _currentFeatureIndex = 0;
  private _appFeaturesInterval: NodeJS.Timeout | null = null;
  private readonly _appFeaturesIntervalTime = 3_000;
  private readonly _arrayOfAppFeatures: Array<string> = [
    'tasks', 'leave plans', 'work time',
  ];

  public ngOnInit(): void {
    this.appFeatures.set(this._arrayOfAppFeatures[this._arrayOfAppFeatures.length - 1]);
  }

  public ngOnDestroy() {
    this._appFeaturesInterval && clearInterval(this._appFeaturesInterval);
  }

  public ngAfterViewInit() {
    this._appFeaturesInterval = setInterval(() => {
      this.appFeatures.set(null);
      setTimeout(() => {
        if (this._currentFeatureIndex == this._arrayOfAppFeatures.length) {
          this._currentFeatureIndex = 0;
        }
        this.appFeatures.set(this._arrayOfAppFeatures[this._currentFeatureIndex]);
        this._currentFeatureIndex += 1;
      }, 1000);
    }, this._appFeaturesIntervalTime);
  }

}
