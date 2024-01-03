import { AssignmentStatusType } from '@core/api/assignment-client.service';
import { Observable } from 'rxjs';

export interface IManageTask {
  isEdit: boolean;
  type: AssignmentStatusType;
  task?: IManageTaskModel;
  loading: Observable<boolean>;
  command: (payload: IManageTaskModel) => void;
}

export interface IManageTaskModel {
  name: string;
  description?: string;
  priority: number;
}
