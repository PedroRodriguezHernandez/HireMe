import { Component } from '@angular/core';
import {ButonComponent} from '../buton/buton.component';

@Component({
  selector: 'app-header-with-login',
  imports: [ButonComponent],
  templateUrl: './header-with-login.component.html',
  standalone: true,
  styleUrl: './header-with-login.component.css'
})
export class HeaderWithLoginComponent {

}
