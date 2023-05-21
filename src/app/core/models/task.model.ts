export interface ITaskModel {
  id: string;
  name: string;
  description?: string;
  priority: number;
  status: TaskStatusEnum;
  createdAt: Date;
}

export interface IManageTaskModel {
  name: string;
  description?: string;
  priority: number;
}

export enum TaskStatusEnum {
  ToDo = 'todo',
  InProgress = 'inProgress',
  Done = 'done',
  Rejected = 'rejected'
}

export const DummyDataArrayOfTasks: ITaskModel[] = [
  {
    id: '1',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut l',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    priority: 1,
    status: TaskStatusEnum.ToDo,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Sweep the floor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    priority: 3,
    status: TaskStatusEnum.ToDo,
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Wash the windows',
    priority: 2,
    status: TaskStatusEnum.InProgress,
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Make dinner',
    priority: 2,
    status: TaskStatusEnum.Done,
    createdAt: new Date(),
  },
  {
    id: '5',
    name: 'Buy a beer',
    priority: 3,
    status: TaskStatusEnum.Rejected,
    createdAt: new Date(),
  },
  {
    id: '6',
    name: 'Watch match',
    priority: 2,
    status: TaskStatusEnum.Done,
    createdAt: new Date(),
  },
];
