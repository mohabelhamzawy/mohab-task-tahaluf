import {Component, effect, input, OnChanges, SimpleChanges} from '@angular/core';
import {AnimationOptions, LottieComponent} from 'ngx-lottie';

@Component({
  selector: 'app-animated-icon',
  imports: [
    LottieComponent
  ],
  templateUrl: './animated-icon.component.html',
  styleUrl: './animated-icon.component.scss'
})
export class AnimatedIconComponent {
  // Inputs
  path = input<string>();
  loop = input<boolean | number>(true);

  // Data
  options: AnimationOptions = {
    path: this.path(),
    loop:this.loop()
  };

  constructor() {
    effect(() => {
      this.options = {
        path: this.path(),
        loop: this.loop()
      };
    });
  }

}
