import {Injectable, linkedSignal, signal} from '@angular/core';
import {QuestionsData} from '../api/questionsApi';
import {QuestionDifficulty, QuestionPoint, QuestionType} from '../enums/question.enum';

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
  #percentageScore = linkedSignal<number>(() => (this.#currentScore() /  this.#totalScore()) * 100);

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
        case QuestionDifficulty.HARD:
          item.score = QuestionPoint.HARD;
          break;
        case QuestionDifficulty.MEDIUM:
          item.score = QuestionPoint.MEDIUM;
          break;
        default:
          item.score = QuestionPoint.EASY;
      }

      this.#totalScore.update(currentVale => currentVale + item.score);

      // item.category =  item.category.toLowerCase();
      item.isResolved = false;

      return item;
    })

    this.#allQuestions = finalQuestions;

    const myMap = new Map();
    this.getCategories().forEach((item: any) => myMap.set(item.id, this.getCategoryQuestions(item.id)) );




    // console.log('all : ', finalQuestions)
    // console.log('RAW : ', this.#data)
    // console.log('ONE : ', this.#data[0])

    this.#questions.set(myMap);
    return this.#questions()
    // return of(result);
  }

  updateQuestions(): void {}

  getCategoryQuestions(categoryName: string): any[] {
    return this.#allQuestions.filter((item: any) => {
      return this.#toCamelCase(item.category) === categoryName;
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
        id: this.#toCamelCase(item)
      }
    });

    return [...categories];
  }

  #toCamelCase(text: string): string {
    return text.split(' ') // Split the string into an array by spaces
      .map((word: string, index: number) =>
        index === 0
          ? word.toLowerCase() // Lowercase the first word
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the first letter of subsequent words
      )
      .join('')
  }

  getTotalPoints() {
    return this.#percentageScore;
  }

  setTotalPoints(newScore: number) {
    this.#currentScore.update(currentVal => {
      // Condition to make sure that maximum percentage will be 10%
      return currentVal + newScore >= this.#totalScore() ? this.#totalScore() : currentVal + newScore
    });
  }
}
