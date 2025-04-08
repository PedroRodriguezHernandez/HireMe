import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ButonComponent } from './buton/buton.component';
import {HeaderWithLoginComponent} from './header-with-login/header-with-login.component';
import {FooterComponent} from './footer/footer.component';
import {CreateComponent} from './create/create.component';
import {LateralOrangeComponent} from './lateral-orange/lateral-orange.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {TextInputComponent} from './text-input/text-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ButonComponent, HeaderWithLoginComponent, LateralOrangeComponent, LoginPageComponent, TextInputComponent],
  imports: [RouterOutlet, HeaderComponent, ButonComponent, HeaderWithLoginComponent, FooterComponent, CreateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'HireMe';
}
