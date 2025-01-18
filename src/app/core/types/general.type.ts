import {QuestionType} from '../enums/question.enum';

export type QuestionUpdates = {
  category: string;
  score: string | number;
  id: string | number;
  userAnswer: string;
};

export type AnswerEmitter = {
  answer: string,
  type?: string | QuestionType,
  index?: number
};
