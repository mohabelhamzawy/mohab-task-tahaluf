import {Component, inject, OnInit} from '@angular/core';
import {RouterUrl} from '../../../../core/enums/routes.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {AskMultipleComponent} from '../ask-multiple/ask-multiple.component';
import {AskBooleanComponent} from '../ask-boolean/ask-boolean.component';
import {AskFreetextComponent} from '../ask-freetext/ask-freetext.component';
import {QuestionsService} from '../../../../core/services/questions.service';
import {QuestionType} from '../../../../core/enums/question.enum';

@Component({
  selector: 'app-quiz-ask',
  imports: [
    AskMultipleComponent,
    AskFreetextComponent
  ],
  templateUrl: './quiz-ask.component.html',
  styleUrl: './quiz-ask.component.scss'
})
export class QuizAskComponent implements OnInit {
  // Injections
  #questionsService = inject(QuestionsService);
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);

  allQuestions: any[] = [];
  currentQuestionIndex: number = 0;



  back() {
    this.#router.navigate([RouterUrl.QUIZ])
  }

  ngOnInit(): void {

    const id = this.#activatedRoute.params.subscribe({
      next: (params: any) => {
        console.log(params.category)
        if (params && params.category) {
          this.allQuestions = [...this.#questionsService.getCategoryQuestions(params.category)];
          console.log('mmmmmmmmmmmm', this.allQuestions);
        }
      }
    })
    // this.#questionsService.getCategoryQuestions()
  }

  protected readonly QuestionType = QuestionType;
}
