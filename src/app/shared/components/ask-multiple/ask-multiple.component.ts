import {Component, input, output} from '@angular/core';
import {TitleCasePipe} from '@angular/common';

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
  answerValue = output<string>();
  selectedIndex: number = NaN;


  sendAnswer(answer: string, index: number) {
    this.answerValue.emit(answer);
    this.selectedIndex = index;
  }
}
