import { Observable } from 'rxjs';

export interface IManageTimer {
  isEdit: boolean;
  timer?: IManageTimerModel;
  loading: Observable<boolean>;
  command: (payload: IManageTimerModel) => void;
}

export interface IManageTimerModel {
  projectId?: string;
  description: string;
  date: string | Date;
}
