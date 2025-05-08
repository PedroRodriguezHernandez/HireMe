import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ButonComponent} from '../buton/buton.component';

@Component({
  selector: 'app-header-initial-page',
  imports: [
    ButonComponent
  ],
  templateUrl: './header-initial-page.component.html',
  standalone: true,
  styleUrl: './header-initial-page.component.css'
})
export class HeaderInitialPageComponent {

  constructor(private router: Router) { }

  goTo(pageName: string) {
    this.router.navigate([pageName])
  }
}
