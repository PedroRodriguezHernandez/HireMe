import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ButonComponent} from '../buton/buton.component';
import {SupabaseService} from '../../services/supabase.service';

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
  constructor(private supabaseService: SupabaseService) {}
  name: string = '';
  email: string = '';
  location: string = '';

  async ngOnInit() {
    const userData = await this.supabaseService.getUserData();
    this.name = JSON.stringify(userData["userData"]["name"]);
    this.email = JSON.stringify(userData["userData"]["email"]);
    this.name = this.name.replace(/['"]+/g, '');
    this.email = this.email.replace(/['"]+/g, '');
  }
}




