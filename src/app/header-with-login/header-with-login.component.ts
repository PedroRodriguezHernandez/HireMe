import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-with-login',
  imports: [],
  templateUrl: './header-with-login.component.html',
  standalone: true,
  styleUrl: './header-with-login.component.css'
})
export class HeaderWithLoginComponent {

  constructor(private router: Router) { }

  goTo(pageName: string) {
    this.router.navigate([pageName])
  }

}
