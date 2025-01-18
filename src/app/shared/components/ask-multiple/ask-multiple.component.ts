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
  options = input<string[]>()
  answerValue = output<AnswerEmitter>();
  selectedIndex = input<number>(NaN)

  sendAnswer(answer: string, index: number) {
    this.answerValue.emit({answer, index});
  }
}
