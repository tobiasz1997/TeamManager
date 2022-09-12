import { animate, style, transition, trigger } from "@angular/animations";

export const CarouselAnimation = {
  slideAnimation: trigger("carouselAnimation", [
    transition("void => *", [
      style({ opacity: 0.5 }),
      animate('500ms ease-in', style({ opacity: 1 }))
    ]),
    transition("* => void", [
      style({ opacity: 1 }),
      animate('100ms ease-in', style({ opacity: 0.5 }))
    ]),
  ])
}
