import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonComponent } from './components/button/button.component';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ScrollTopButtonComponent } from './components/scroll-top-button/scroll-top-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonComponent,
    FirstLetterUppercasePipe,
    CarouselComponent,
    ScrollTopButtonComponent
  ],
  exports: [
    ButtonComponent,
    CarouselComponent,
    ScrollTopButtonComponent
  ],
  providers: [],
})
export class SharedModule {}
