import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {QuestionsService} from './core/services/questions.service';
import {tap} from 'rxjs';
import {HintComponent} from './shared/components/hint/hint.component';
import {} from '@angular/common';
import {ProgressComponent} from './shared/components/progress/progress.component';
import {HeaderComponent} from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // Injections
  #questionsService = inject(QuestionsService);
  questions: any;
  categoriesList: any[] = [];


  getCategories(): void {
    this.categoriesList = this.#questionsService.getCategories()
  }

  getQuestions(): void {
    console.log(this.#questionsService.getQuestions());
    // this.#questionsService.getQuestions().pipe(
    //   tap((res: any) => {
    //     this.questions = res;
    //     console.log('FROM APP ', this.questions);
    //   })
    // )
    //   .subscribe();
  }

  ngOnInit(): void {
    this.getQuestions();
    this.#questionsService.getTotalPoints()

  }
}
