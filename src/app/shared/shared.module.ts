import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonComponent } from './components/button/button.component';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonComponent,
    FirstLetterUppercasePipe,
    CarouselComponent
  ],
    exports: [
        ButtonComponent,
        CarouselComponent
    ],
  providers: [],
})
export class SharedModule {}
