import { Component } from '@angular/core';
import {LateralOrangeComponent} from '../lateral-orange/lateral-orange.component';
import {TextInputComponent} from '../text-input/text-input.component';
import {ButonComponent} from '../buton/buton.component';

@Component({
  selector: 'app-login-page',
  imports: [
    LateralOrangeComponent,
    TextInputComponent,
    ButonComponent
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
