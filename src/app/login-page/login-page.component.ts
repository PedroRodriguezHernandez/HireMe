import { Component } from '@angular/core';
import {TextInputComponent} from '../text-input/text-input.component';
import {ButonComponent} from '../buton/buton.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-login-page',
  imports: [
    TextInputComponent,
    ButonComponent,
    FooterComponent
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
