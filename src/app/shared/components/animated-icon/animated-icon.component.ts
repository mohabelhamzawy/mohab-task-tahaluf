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

  // Data
  options: AnimationOptions = {
    path: this.path(),
  };

  constructor() {
    effect(() => {
      this.options = {
        path: this.path()
      };
    });
  }

  // animationCreated(animationItem: AnimationItem): void {
  //   console.log(animationItem);
  // }
}
