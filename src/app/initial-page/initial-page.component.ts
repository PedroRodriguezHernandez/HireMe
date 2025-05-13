import {Component, Inject, OnInit} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {HeaderInitialPageComponent} from '../header-initial-page/header-initial-page.component';
import {Router} from '@angular/router';
import {AuthInterface} from '../core/interface/auth-interface';
import {SupabaseAuthClient} from '@supabase/supabase-js/dist/main/lib/SupabaseAuthClient';
import {NgIf} from '@angular/common';
import {HeaderWithLoginComponent} from '../header-with-login/header-with-login.component';
import {AuthSupabaseService} from '../core/services/auth-supabase.service';
import * as console from 'console';

@Component({
  selector: 'app-initial-page',
  imports: [
    FooterComponent,
    HeaderInitialPageComponent,
    NgIf,
    HeaderWithLoginComponent
  ],
  templateUrl: './initial-page.component.html',
  standalone: true,
  styleUrl: './initial-page.component.css'
})
export class InitialPageComponent implements OnInit{
  async ngOnInit() {
    await this.auth.getCurrentUser().subscribe({
      next: authUser => {
        this.login = !!authUser;
      },
      error: err => {
        this.login = false;
      }
    });
  }


  protected readonly alert = alert;
  protected login: boolean = false;
  constructor(
    private router: Router,
    @Inject(AuthSupabaseService) protected auth: AuthInterface
  ) {}

  onSearch(value: string) {
    const trimmed = value.trim();
    console.log(trimmed);
    this.router.navigate(['/home'], { queryParams: { search: trimmed } });
  }
}
