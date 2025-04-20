import { Component } from '@angular/core';
import {ButonComponent} from '../buton/buton.component';
import {SupabaseService} from '../../services/supabase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    ButonComponent
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  title = 'profile'
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    const userData = this.supabaseService.getUserData();
    console.log(userData);
  }

  goTo(pageName: string) {
    this.router.navigate([pageName])
  }
}




