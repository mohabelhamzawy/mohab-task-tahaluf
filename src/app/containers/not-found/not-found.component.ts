import { Component } from '@angular/core';
import {AnimatedIconComponent} from "../../shared/components/animated-icon/animated-icon.component";
import {RouterLink} from '@angular/router';
import {LottiePath} from '../../core/defines/lottie.defines';

@Component({
  selector: 'app-not-found',
  imports: [
    AnimatedIconComponent,
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  lottiePath = LottiePath.NOT_FOUND;
}
