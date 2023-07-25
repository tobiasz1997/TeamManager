export interface ITimerModel {
  id: string;
  project?: IProjectModel;
  description: string;
  date: Date;
}

export interface IProjectModel {
  id: string;
  label: string;
  color: string;
}

export const DummyDataArrayOfTimers: ITimerModel[] = [
  {
    id: '1',
    project: null,
    date: new Date(2023, 3, 12),
    description: 'Did task #123',
  },
  {
    id: '2',
    project: {
      id: '1',
      label: 'Disney',
      color: '#332244',
    },
    date: new Date(2023, 4, 16),
    description: 'Cleaned room',
  },
  {
    id: '3',
    project: {
      id: '2',
      label: 'Netflix',
      color: '#ddd222',
    },
    date: new Date(2023, 6, 23),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];
