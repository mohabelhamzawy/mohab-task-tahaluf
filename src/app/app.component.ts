import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {QuestionsService} from './core/services/questions.service';
import {HeaderComponent} from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // Injections
  #questionsService = inject(QuestionsService);

  ngOnInit(): void {
    this.#getQuestions();
    this.#questionsService.getTotalPoints();
  }

  #getQuestions(): void {
    this.#questionsService.getQuestions();
  }

}
