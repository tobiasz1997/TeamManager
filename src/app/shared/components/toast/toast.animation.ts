import { animate, style, transition, trigger } from '@angular/animations';

export const ToastAnimation = {
  toastAnimation: trigger('toastAnimation', [
    transition(':enter', [
      style({ opacity: 0, right: '-20rem', zIndex: 200 }),
      animate('0.2s ease-out', style({ opacity: 1, right: 0, zIndex: 200 })),
    ]),
    transition(':leave', [
      animate('0.2s ease-out', style({ opacity: 0, right: 0, zIndex: 200 })),
    ]),
  ]),
};
