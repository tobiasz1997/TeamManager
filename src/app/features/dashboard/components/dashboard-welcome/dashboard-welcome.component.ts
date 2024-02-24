import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardWelcomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public appFeatures: string | null = '';

  private _currentFeatureIndex = 0;
  private _appFeaturesInterval: NodeJS.Timeout | null = null;
  private readonly _appFeaturesIntervalTime = 3_000;
  private readonly _arrayOfAppFeatures: Array<string> = [
    'tasks', 'leave plans', 'work time',
  ];

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.appFeatures = this._arrayOfAppFeatures[this._arrayOfAppFeatures.length - 1];
  }

  public ngOnDestroy() {
    this._appFeaturesInterval && clearInterval(this._appFeaturesInterval);
  }

  public ngAfterViewInit() {
    this._appFeaturesInterval = setInterval(() => {
      this.appFeatures = null;
      setTimeout(() => {
        if (this._currentFeatureIndex == this._arrayOfAppFeatures.length) {
          this._currentFeatureIndex = 0;
        }
        this.appFeatures = this._arrayOfAppFeatures[this._currentFeatureIndex];
        this._currentFeatureIndex += 1;
        this._changeDetectorRef.detectChanges();
      }, 1000);
    }, this._appFeaturesIntervalTime);
  }

}
