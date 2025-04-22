import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ButonComponent} from '../buton/buton.component';
import {SupabaseService} from '../../services/supabase.service';
import {HeaderComponent} from '../header/header.component';
import {HeaderWithLoginComponent} from '../header-with-login/header-with-login.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    NgOptimizedImage,
    ButonComponent,
    HeaderComponent,
    HeaderWithLoginComponent
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  title = 'profile'
  constructor(private supabaseService: SupabaseService, protected router : Router) {}
  name: string = '';
  email: string = '';
  location: string = '';

  async ngOnInit() {
    const userData = await this.supabaseService.getUserData();
    this.name = JSON.stringify(userData["userData"]["name"]);
    this.email = JSON.stringify(userData["userData"]["email"]);
    this.location = JSON.stringify(userData["userData"]["location"]);
    this.name = this.name.replace(/['"]+/g, '');
    this.email = this.email.replace(/['"]+/g, '');
    this.location = this.location.replace(/['"]+/g, '');
  }

  logout() {
    this.supabaseService.signOut();
    this.router.navigate(['login']);
  }
}




