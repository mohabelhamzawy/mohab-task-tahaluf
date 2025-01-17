import {Component, inject, OnInit} from '@angular/core';
import {HintComponent} from "../hint/hint.component";
import {QuestionsService} from '../../../core/services/questions.service';

@Component({
  selector: 'app-quiz-info',
  imports: [
    HintComponent
  ],
  templateUrl: './quiz-info.component.html',
  styleUrl: './quiz-info.component.scss'
})


export class QuizInfoComponent implements OnInit {
  // Injections
  #questionsService = inject(QuestionsService);

  categoriesList: any[] = [];

  ngOnInit(): void {
    this.getCategories();

  }


  getCategories(): void {
    this.categoriesList = this.#questionsService.getCategories()
  }
}
