import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {HeaderInitialPageComponent} from '../header-initial-page/header-initial-page.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-initial-page',
  imports: [
    FooterComponent,
    HeaderInitialPageComponent
  ],
  templateUrl: './initial-page.component.html',
  standalone: true,
  styleUrl: './initial-page.component.css'
})
export class InitialPageComponent {

  protected readonly alert = alert;

  constructor(private router: Router) {
  }

  onSearch(value: string) {
    const trimmed = value.trim();
    console.log(trimmed);
    this.router.navigate(['/home'], { queryParams: { search: trimmed } });
  }
}
