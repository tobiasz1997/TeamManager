import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IOption } from '@shared/interfaces/option.interface';

@Component({
  selector: 'tm-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  @Input() data: Array<IFilterItem>;
}

export interface IFilterItem {
  name: string;
  placeholder: string;
  type: 'date' | 'select';
  options?: Array<IOption<string>>;
}
