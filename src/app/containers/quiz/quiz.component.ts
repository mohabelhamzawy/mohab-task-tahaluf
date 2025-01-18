import {Component, effect, inject, OnInit} from '@angular/core';
import {ProgressComponent} from '../../shared/components/progress/progress.component';
import {RouterOutlet} from '@angular/router';
import {AnimatedIconComponent} from '../../shared/components/animated-icon/animated-icon.component';
import {LottiePath} from '../../core/enums/lottie.enum';
import {QuestionsService} from '../../core/services/questions.service';

@Component({
  selector: 'app-quiz',
  imports: [
    ProgressComponent,
    RouterOutlet,
    AnimatedIconComponent
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  serv = inject(QuestionsService);
  protected readonly LottiePath = LottiePath;
  flagPath: LottiePath | undefined = LottiePath.EMPTY;

  constructor() {
    effect(() => {
      this.flagPath = this.serv.getAnswerStatus()()?.path;
    });
  }

  ngOnInit(): void {
  }

}
