import { IRoute } from '@shared/interfaces/route.interface';

export const AppRoutes = {
  home: {
    title: 'home',
    path: '',
    absolutePath: '',
  } as IRoute,
  signIn: {
    title: 'sign in',
    path: 'sign-in',
    absolutePath: '/sign-in',
  } as IRoute,
  signUp: {
    title: 'register',
    path: 'sign-up',
    absolutePath: '/sign-up',
  } as IRoute,
  tasks: {
    title: 'tasks',
    path: 'tasks',
    absolutePath: '/tasks',
  } as IRoute,
  timers: {
    title: 'timers',
    path: 'timers',
    absolutePath: '/timers',
  } as IRoute,
  profile: {
    title: 'profile',
    path: 'profile',
    absolutePath: '/profile',
  } as IRoute,
};
