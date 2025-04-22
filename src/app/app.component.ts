import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ButonComponent } from './buton/buton.component';
import {HeaderWithLoginComponent} from './header-with-login/header-with-login.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {TextInputComponent} from './text-input/text-input.component';
import {FooterComponent} from './footer/footer.component';
import {ProfileComponent} from './profile/profile.component';
import {CreateComponent} from './create/create.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ButonComponent, HeaderWithLoginComponent,
    LoginPageComponent, TextInputComponent, ProfileComponent, FooterComponent, CreateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'HireMe';
}
