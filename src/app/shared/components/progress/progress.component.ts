import {Component, effect, inject, input, OnChanges, signal, SimpleChanges} from '@angular/core';
import {NgClass} from '@angular/common';
import {ProgressbarComponent} from 'ngx-bootstrap/progressbar';
import {ProgressType} from '../../../core/enums/progress.enum';
import {QuestionsService} from '../../../core/services/questions.service';

@Component({
  selector: 'app-progress',
  imports: [
    ProgressbarComponent
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnChanges {
  value = signal<number>(0);
  type = signal<ProgressType>(ProgressType.WARNING);
  questionsService = inject(QuestionsService)

  constructor() {
    effect(() => {
      this.value.set(this.questionsService.getTotalPoints()());
      this.setTypeColor();
    });
  }

  ngOnChanges(): void {
    this.setTypeColor();
  }


  setTypeColor(): void {
    const value = this.value();

    switch (true) {
      case value >= 41 && value <= 80:
        this.type.set(ProgressType.INFO);
        break;
      case value >= 81 && value <= 100:
        this.type.set(ProgressType.SUCCESS);
        break;
      default:
        this.type.set(ProgressType.WARNING);
        break;
    }





  }

}
