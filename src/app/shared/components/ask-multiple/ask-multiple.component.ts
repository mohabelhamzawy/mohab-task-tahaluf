import {Component, input, model} from '@angular/core';
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
  click = model<string>('')


  next(valueName: string) {
    console.log('clicked')
    this.click.update(val => valueName);
  }
}
