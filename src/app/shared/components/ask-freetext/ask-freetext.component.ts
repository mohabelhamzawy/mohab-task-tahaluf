import {AfterViewInit, Component, ElementRef, input, model, output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AnswerEmitter} from '../../../core/types/general.type';
import {fromEvent, map} from 'rxjs';
import {QuestionType} from '../../../core/enums/question.enum';

@Component({
  selector: 'app-ask-freetext',
  imports: [
    FormsModule
  ],
  templateUrl: './ask-freetext.component.html',
  styleUrl: './ask-freetext.component.scss'
})
export class AskFreetextComponent implements AfterViewInit{

  answerValue = output<AnswerEmitter>();
  questionType = input<string>('');
  inputValue = model<string>('');
  @ViewChild('answerInput') answerInput!: ElementRef;

  ngAfterViewInit(): void {
    // Listening to textarea value changes
    fromEvent(this.answerInput.nativeElement, 'input').pipe(
      map((res: any) => res.target.value),
    ).subscribe({
      next: (answer: string) => {
        // Emit textarea value to parent
        this.answerValue.emit({answer, type: QuestionType.FREETEXT});
      }
    })
  }

}
