import { IRoute } from "./shared/interfaces/route.interface";

export const AppRoutes = {
  home: {
    path: '',
    absolutePath: ''
  } as IRoute,
  login: {
    path: 'login',
    absolutePath: '/login'
  } as IRoute,
  tasks: {
    path: 'tasks',
    absolutePath: '/tasks'
  } as IRoute
};
