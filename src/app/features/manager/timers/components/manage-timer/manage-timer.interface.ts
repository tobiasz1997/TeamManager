import { IManageTimerModel } from '@core/models/timer.model';

export interface IManageTimer {
  isEdit: boolean;
  timer?: IManageTimerModel;
}
