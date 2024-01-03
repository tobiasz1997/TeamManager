import { Pipe, PipeTransform } from '@angular/core';
import { AssignmentStatusType } from '@core/api/assignment-client.service';

@Pipe({
  name: 'taskStatusToText',
  pure: true,
})
export class TaskStatusToTextPipe implements PipeTransform {

  transform(value: AssignmentStatusType): string {
    switch (value) {
      case AssignmentStatusType.ToDo:
        return 'Todo';
      case AssignmentStatusType.InProgress:
        return 'In Progress';
      case AssignmentStatusType.Done:
        return 'Done';
      case AssignmentStatusType.Aborted:
        return 'Rejected';
    }
  }

}
