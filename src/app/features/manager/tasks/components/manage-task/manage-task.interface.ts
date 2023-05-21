import { IManageTaskModel, TaskStatusEnum } from '@core/models/task.model';

export interface IManageTask {
  isEdit: boolean;
  type: TaskStatusEnum;
  task?: IManageTaskModel;
}
