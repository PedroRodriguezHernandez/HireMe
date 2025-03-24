import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ButonComponent} from '../buton/buton.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButonComponent
  ],
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
