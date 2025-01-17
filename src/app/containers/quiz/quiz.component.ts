import { Component } from '@angular/core';
import {ProgressComponent} from '../../shared/components/progress/progress.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [
    ProgressComponent,
    RouterOutlet
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

}
