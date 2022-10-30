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
  bundy: {
    title: 'bundy',
    path: 'bundy',
    absolutePath: '/bundy',
  } as IRoute,
  profile: {
    title: 'profile',
    path: 'profile',
    absolutePath: '/profile',
  } as IRoute,
};
