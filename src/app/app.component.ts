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
    this.#questionsService.getTotalPoints();
  }
}
