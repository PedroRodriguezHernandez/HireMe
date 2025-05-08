import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {HeaderInitialPageComponent} from '../header-initial-page/header-initial-page.component';
import {ButonComponent} from '../buton/buton.component';

@Component({
  selector: 'app-initial-page',
  imports: [
    FooterComponent,
    HeaderInitialPageComponent,
    ButonComponent
  ],
  templateUrl: './initial-page.component.html',
  standalone: true,
  styleUrl: './initial-page.component.css'
})
export class InitialPageComponent {

  protected readonly alert = alert;
}
