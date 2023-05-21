import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatusEnum } from '@core/models/task.model';

@Pipe({
  name: 'taskStatusToText',
  pure: true,
})
export class TaskStatusToTextPipe implements PipeTransform {

  transform(value: TaskStatusEnum): string {
    switch (value) {
      case TaskStatusEnum.ToDo:
        return 'Todo';
      case TaskStatusEnum.InProgress:
        return 'In Progress';
      case TaskStatusEnum.Done:
        return 'Done';
      case TaskStatusEnum.Rejected:
        return 'Rejected';
    }
  }

}
