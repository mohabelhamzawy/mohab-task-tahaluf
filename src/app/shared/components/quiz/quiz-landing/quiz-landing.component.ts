import {Component, inject} from '@angular/core';
import {ProgressComponent} from '../../progress/progress.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-quiz-landing',
  imports: [
    ProgressComponent,
    RouterOutlet
  ],
  templateUrl: './quiz-landing.component.html',
  styleUrl: './quiz-landing.component.scss'
})
export class QuizLandingComponent {
}
