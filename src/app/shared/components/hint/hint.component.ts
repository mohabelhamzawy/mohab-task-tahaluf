import {Component, inject, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {Router} from '@angular/router';
import {RouterUrl} from '../../../core/enums/routes.enum';

@Component({
  selector: 'app-hint',
  imports: [

  ],
  templateUrl: './hint.component.html',
  styleUrl: './hint.component.scss'
})
export class HintComponent {
  // Injections
  #router = inject(Router);

  color = input<string>('secondary')
  isClickable = input<any>({});

  route() {
    if (this.isClickable()) {
      this.#router.navigate([`${RouterUrl.QUIZ}/${RouterUrl.QUIZ_ASK}`, this.isClickable().id])
    }
  }
}
