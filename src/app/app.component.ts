import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ButonComponent } from './buton/buton.component';
import {HeaderWithLoginComponent} from './header-with-login/header-with-login.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ButonComponent, HeaderWithLoginComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'HireMe';
}
