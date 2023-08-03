import { DummyDataArrayOfProjects, IProjectModel } from '@core/models/project.model';

export interface ITimerModel {
  id: string;
  project?: IProjectModel;
  description: string;
  date: Date;
}

export interface IManageTimerModel {
  projectId?: string;
  description: string;
  date: string | Date;
}

export const DummyDataArrayOfTimers: ITimerModel[] = [
  {
    id: '1',
    project: null,
    date: new Date(2023, 3, 12).toIsoDate(),
    description: 'Did task #123',
  },
  {
    id: '2',
    project: DummyDataArrayOfProjects[0],
    date: new Date(2023, 4, 16).toIsoDate(),
    description: 'Cleaned room',
  },
  {
    id: '3',
    project: DummyDataArrayOfProjects[1],
    date: new Date(2023, 6, 23).toIsoDate(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];
