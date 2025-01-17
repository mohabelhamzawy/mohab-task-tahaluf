import {Injectable, linkedSignal, signal} from '@angular/core';
import {QuestionsData} from '../api/questionsApi';
import {QuestionCategory, QuestionDifficulty, QuestionType} from '../enums/question.enum';

@Injectable({
  providedIn: 'root'
})

export class QuestionsService {
  #data = QuestionsData;
  #allQuestions: any[] = [];
  #questions = signal<any>(new Map());

  // Progressbar Data
  #totalScore = signal<number>(0);
  #currentScore = signal<number>(0);
  #percentageScore = linkedSignal<number>(() => (this.#currentScore() / 100) * this.#totalScore());

  constructor() { }

  getQuestions(): any {
    let finalQuestions: any = [];
    const questions: any = [...this.#data];
    // result.categories = this.getCategories();
    finalQuestions = questions.map((item: any) => {
      if (item.type === QuestionType.MULTIPLE || QuestionType.BOOLEAN) {
        let options = [];
        if (item.type === QuestionType.BOOLEAN) {
          const correctAnswer = item.correct_answer.toLowerCase();
          const inCorrectAnswer = correctAnswer === 'true' ? 'false' : 'true';
          options = [correctAnswer, inCorrectAnswer].sort(() => Math.random() - 0.5);

        } else {
          const correctAnswer = item.correct_answer.toLowerCase();
          let inCorrectAnswers: string[] = item.incorrect_answers ? item.incorrect_answers.map((ele: string) => ele.toLowerCase()) : [];
          options = [correctAnswer, ...inCorrectAnswers].sort(() => Math.random() - 0.5);
        }
        item.correct_answer = item.correct_answer.toLowerCase();
        delete item.incorrect_answer;
        delete item.incorrect_answers;
        item.options = [...options];
      }
      if (item.type === QuestionType.FREETEXT) {
        item.correct_answer = (item.correct_answer as string).toLowerCase();
      }

      switch(item.difficulty.toLowerCase()) {
        case QuestionDifficulty.MEDIUM:
          item.score = 3;
          break;
        case QuestionDifficulty.HARD:
          item.score = 5;
          break;
        default:
          item.score = 1;
      }

      this.#totalScore.update(currentVale => currentVale + item.score);

      // item.category =  item.category.toLowerCase();
      item.isResolved = false;

      return item;
    })

    this.#allQuestions = finalQuestions;

    const myMap = new Map();
    this.getCategories().forEach((item: any) => myMap.set(item.name.toLowerCase(), this.getCategoryQuestions(item.name)) );




    // console.log('all : ', finalQuestions)
    // console.log('RAW : ', this.#data)
    // console.log('ONE : ', this.#data[0])

    this.#questions.set(myMap);
    return this.#questions()
    // return of(result);
  }

  updateQuestions(): void {}

  getCategoryQuestions(cat: QuestionCategory): any[] {
    return this.#allQuestions.filter((item: any) => {
      return item.category.toLowerCase() === cat.toLowerCase()
    })
  }

  getCategories(): any[] {
    let categories: any = [];
    this.#data.forEach((item: any) => {
      if (item && item.category) {
        categories.push(item.category);
      }
    })

    categories = [...new Set(categories)].map((item: any) => {
      return {
        name: item,
        id: item.split(' ') // Split the string into an array by spaces
          .map((word: string, index: number) =>
            index === 0
              ? word.toLowerCase() // Lowercase the first word
              : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the first letter of subsequent words
          )
          .join('')
      }
    });

    return [...categories];
  }


  getTotalPoints() {
    return this.#percentageScore;
  }

  setTotalPoints(newScore: number) {
    this.#currentScore.update(currentVal => currentVal + newScore);
  }
}
