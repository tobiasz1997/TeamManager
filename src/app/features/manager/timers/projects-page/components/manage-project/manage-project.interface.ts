import { Observable } from 'rxjs';

export interface IManageProject {
  isEdit: boolean;
  project?: IManageProjectModel;
  loading: Observable<boolean>;
  command: (payload: IManageProjectModel) => void;
}

export interface IManageProjectModel {
  label: string;
  color: string;
}
