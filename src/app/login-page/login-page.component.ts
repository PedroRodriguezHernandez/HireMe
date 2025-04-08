import { Component } from '@angular/core';
import {LateralOrangeComponent} from '../lateral-orange/lateral-orange.component';
import {TextInputComponent} from '../text-input/text-input.component';
import {ButonComponent} from '../buton/buton.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupabaseService} from '../supabase.service';
import {NgIf} from '@angular/common';
import {showAlert} from '../../services/utils';

@Component({
  selector: 'app-login-page',
  imports: [
    LateralOrangeComponent,
    TextInputComponent,
    ButonComponent,
    ReactiveFormsModule,
    NgIf
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

  constructor(private supabaseService: SupabaseService) {

  }

  login() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email ?? "",
        password: this.loginForm.value.password ?? ""
      };

      this.supabaseService.signIn(credentials)
        .then(response => {
          console.log('Login successful:', response);
        })
        .catch(async error => {
          showAlert("Email or password is incorrect", "Please check your email and password and try again.");
        });
    } else {
      showAlert("Invalid form", "Please check your email and password.");
    }
  }
}
