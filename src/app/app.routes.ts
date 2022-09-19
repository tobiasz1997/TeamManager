import { IRoute } from './shared/interfaces/route.interface';

export const AppRoutes = {
  home: {
    path: '',
    absolutePath: '',
  } as IRoute,
  signIn: {
    path: 'sign-in',
    absolutePath: '/sign-in',
  } as IRoute,
  signUp: {
    path: 'sign-up',
    absolutePath: '/sign-up',
  } as IRoute,
  tasks: {
    path: 'tasks',
    absolutePath: '/tasks',
  } as IRoute,
};
