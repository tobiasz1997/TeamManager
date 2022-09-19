import { animate, style, transition, trigger } from '@angular/animations';

export const HeaderAnimations = {
  panelAnimation: trigger('panelAnimation', [
    transition(':enter', [
      style({ opacity: 0, top: '-1rem', zIndex: -50 }),
      animate('0.2s ease-out', style({ opacity: 1, top: '4rem', zIndex: -50 })),
    ]),
    transition(':leave', [
      animate(
        '0.2s ease-out',
        style({ opacity: 0, top: '-1rem', zIndex: -50 })
      ),
    ]),
  ]),
};
