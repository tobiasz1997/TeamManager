import { IManageProjectModel } from '@core/models/project.model';

export interface IManageProject {
  isEdit: boolean;
  project?: IManageProjectModel;
}
