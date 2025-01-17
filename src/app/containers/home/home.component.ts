import { Component } from '@angular/core';
import {HintComponent} from '../../shared/components/hint/hint.component';
import {RouterLink} from '@angular/router';
import {RouterUrl} from '../../core/enums/routes.enum';

@Component({
  selector: 'app-home',
  imports: [
    HintComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  protected readonly RouterUrl = RouterUrl;
}
