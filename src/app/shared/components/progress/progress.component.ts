import {Component, effect, inject, linkedSignal, OnChanges, signal} from '@angular/core';
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
  // Injections
  questionsService = inject(QuestionsService)

  // Data
  #rawValue = signal<number>(0);
  value = linkedSignal<number>(() => parseFloat(this.#rawValue().toFixed(1)));
  type = signal<ProgressType>(ProgressType.WARNING);


  constructor() {
    effect(() => {
      this.#rawValue.set(this.questionsService.getTotalPoints()());
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
