import {Injectable, linkedSignal, signal} from '@angular/core';
import {QuestionsData} from '../api/questionsApi';
import {QuestionDifficulty, QuestionPoint, QuestionType} from '../enums/question.enum';
import {QuestionUpdates} from '../types/general.type';
import {LottiePath} from '../enums/lottie.enum';

@Injectable({
  providedIn: 'root'
})

export class QuestionsService {
  #apiData = QuestionsData;
  #questionsArray: any[] = [];
  #questionsMap = signal<any>(new Map());
  #answerStatus = signal<{ isCorrect?: boolean, path?: LottiePath } | null>(null);

  // Progressbar Data
  #totalScore = signal<number>(0);
  #currentScore = signal<number>(0);
  #percentageScore = linkedSignal<number>(() => (this.#currentScore() /  this.#totalScore()) * 100);


  // Questions Methods
  getQuestions(): any {
    let id = 1;
    let finalQuestions: any = [];
    const questions: any = [...this.#apiData];
    // result.categories = this.getCategories();
    finalQuestions = questions.map((item: any) => {
      if (item.type === QuestionType.MULTIPLE || QuestionType.BOOLEAN) {
        let options = [];
        const correctAnswer = item.correct_answer.toLowerCase();

        // Set Options by random sorting
        if (item.type === QuestionType.BOOLEAN) {
          const inCorrectAnswer = correctAnswer === 'true' ? 'false' : 'true';
          options = [correctAnswer, inCorrectAnswer].sort(() => Math.random() - 0.5);
        } else {
          const inCorrectAnswers: string[] = item.incorrect_answers ? item.incorrect_answers.map((ele: string) => ele.toLowerCase()) : [];
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

      item.isResolved = false;
      item.id = id;
      id++
      item.userAnswer = '';
      delete item.difficulty;

      return item;
    })

    this.#questionsArray = finalQuestions;

    const questionsMap = new Map();
    // Set Questions by random sorting
    this.getCategories().forEach((item: any) => questionsMap.set(item.id, this.#setCategoryQuestions(item.id).sort(() => Math.random() - 0.5)) );

    // Final Data
    this.#questionsMap.set(questionsMap);
    return this.#questionsMap();
  }

  updateQuestions(currentAnswer: QuestionUpdates | null = null): void {
    if (currentAnswer) {
      const categoryName = this.#toCamelCase(currentAnswer.category);
      let categoryQuestions = this.#questionsMap().get(categoryName);

      categoryQuestions.forEach((item: any) => {
        if (item.id === currentAnswer.id) {
          const resolvedQuestion = Object.assign(item, {...currentAnswer});

          this.#handleAnswer(resolvedQuestion);
          resolvedQuestion.isResolved = true;

          return resolvedQuestion;
        } else {
          return item
        }
      })
    }
  }



  // Categories Methods
  getCategories(): any[] {
    let categories: any = [];
    this.#apiData.forEach((item: any) => {
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

  getCategoryQuestions(categoryName: string): any[] {
    return this.#questionsMap().get(categoryName).filter((item: any) => {
      return !item.isResolved && this.#toCamelCase(item.category) === categoryName;
    })
  }



  // Answers Methods
  getAnswerStatus() {
    return this.#answerStatus
  }



  // Points Methods
  getTotalPoints() {
    return this.#percentageScore;
  }

  setTotalPoints(newScore: number) {
    this.#currentScore.update(currentVal => {
      // Condition to make sure that maximum percentage will be 10%
      return currentVal + newScore >= this.#totalScore() ? this.#totalScore() : currentVal + newScore
    });
  }

  #setCategoryQuestions(categoryName: string): any[] {
    return this.#questionsArray.filter((item: any) => {
      return this.#toCamelCase(item.category) === categoryName;
    })
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

  #handleAnswer(question: any) {
    const statusDuration = 2300;
    const isCorrect = question.userAnswer.toLowerCase() === question.correct_answer.toLowerCase();
    this.setTotalPoints(isCorrect ? question.score : 0);

    this.#answerStatus.set({
      isCorrect,
      path: isCorrect ? LottiePath.CORRECT : LottiePath.WRONG,
    });

    setTimeout(() => {
      this.#answerStatus.set(null);
    }, statusDuration);
  }
}
