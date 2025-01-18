export type QuestionUpdates = {
  category: string;
  score: string | number;
  id: string | number;
  userAnswer: string;
};

export type AnswerEmitter = {
  answer: string,
  index: number
};
