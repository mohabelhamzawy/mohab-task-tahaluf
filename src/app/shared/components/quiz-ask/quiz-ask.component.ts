import {Component, inject, linkedSignal, OnInit, signal} from '@angular/core';
import {RouterUrl} from '../../../core/enums/routes.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {AskMultipleComponent} from '../ask-multiple/ask-multiple.component';
import {AskFreetextComponent} from '../ask-freetext/ask-freetext.component';
import {QuestionsService} from '../../../core/services/questions.service';
import {QuestionType} from '../../../core/enums/question.enum';
import {AnswerEmitter, QuestionUpdates} from '../../../core/types/general.type';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-quiz-ask',
  imports: [
    AskMultipleComponent,
    AskFreetextComponent,
    NgClass
  ],
  templateUrl: './quiz-ask.component.html',
  styleUrl: './quiz-ask.component.scss'
})
export class QuizAskComponent implements OnInit {
  // Injections
  #questionsService = inject(QuestionsService);
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);

  protected readonly QuestionType = QuestionType;
  availableQuestions = signal<any[]>([]);
  currentQuestionIndex = signal<number>(0);
  currentQuestion = linkedSignal<any>(() => this.availableQuestions()[this.currentQuestionIndex()]);

  currentAnswerIndex = signal<number>(NaN);

  stageAnswer = signal<QuestionUpdates | null> (null)

  ngOnInit(): void {
    const id = this.#activatedRoute.params.subscribe({
      next: (params: any) => {
        if (params && params.category) {
          this.availableQuestions.set([...this.#questionsService.getCategoryQuestions(params.category)]);
          console.log('mmmmmmmmmmmm', this.availableQuestions());
        }
      }
    })
  }

  backToCategories(): void {
    this.#router.navigate([RouterUrl.QUIZ])
  }

  update() {
    if ( this.stageAnswer() ) {
      this.#questionsService.updateQuestions(this.stageAnswer());

      if ( this.currentQuestionIndex() < this.availableQuestions().length - 1 ) {
        this.currentQuestionIndex.update(index => index+1)
      } else {
        this.backToCategories();
      }
    }

    this.stageAnswer.set(null);
    this.currentAnswerIndex.set(NaN);
  }

  setAnswerValue(event: AnswerEmitter) {
    const data: QuestionUpdates = {
      category: this.currentQuestion().category,
      id: this.currentQuestion().id,
      score: this.currentQuestion().score,
      userAnswer: event.answer.toLowerCase()
    };

    this.stageAnswer.set(data);
    this.currentAnswerIndex.set(event.index);
  }
}
