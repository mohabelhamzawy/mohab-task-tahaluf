import {Component, input, output} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {AnswerEmitter} from '../../../core/types/general.type';

@Component({
  selector: 'app-ask-multiple',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './ask-multiple.component.html',
  styleUrl: './ask-multiple.component.scss'
})
export class AskMultipleComponent {
  // Inputs
  options = input<string[]>();
  questionType = input<string>('');
  selectedAnswerIndex = input<number>(NaN);

  // Outputs
  answerValue = output<AnswerEmitter>();

  sendAnswer(answer: string, type: string, index: number) {
    this.answerValue.emit({answer, type, index});
  }
}
