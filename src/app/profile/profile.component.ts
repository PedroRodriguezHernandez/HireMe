import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ButonComponent} from '../buton/buton.component';

@Component({
  selector: 'app-profile',
  imports: [
    NgOptimizedImage,
    ButonComponent
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  title = 'profile'
}
