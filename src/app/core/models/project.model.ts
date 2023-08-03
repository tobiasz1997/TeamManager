export interface IProjectModel {
  id: string;
  label: string;
  color: string;
}

export interface IManageProjectModel {
  label: string;
  color: string;
}

export const DummyDataArrayOfProjects: IProjectModel[] = [
  {
    id: '1',
    label: 'Disney',
    color: '#332244',
  },
  {
    id: '2',
    label: 'Netflix',
    color: '#e05d0d',
  },
  {
    id: '3',
    label: 'Amazon',
    color: '#0ae3ca',
  },
];
