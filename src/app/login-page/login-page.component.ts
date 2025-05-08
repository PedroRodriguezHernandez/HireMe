import { Component } from '@angular/core';
import { TextInputComponent } from '../text-input/text-input.component';
import { ButonComponent } from '../buton/buton.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { NgIf } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    TextInputComponent,
    ButonComponent,
    FooterComponent,
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  errorMessage: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    // Limpiar mensaje de error si el usuario modifica los campos
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  goTo(pageName: string) {
    this.router.navigate([pageName])
  }

  login() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? ''
      };

      this.supabaseService.signIn(credentials)
        .then(response => {
          console.log('Login successful:', response);
          this.router.navigate(['my-profile']);
        })
        .catch(error => {
          this.errorMessage = 'Email or password is incorrect';
        });
    } else {
      this.errorMessage = 'Email or password is incorrect';
    }
  }
}



