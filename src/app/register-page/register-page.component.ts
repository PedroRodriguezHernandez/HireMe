import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {UserSupabaseService} from '../core/services/user-supabase.service';
import {AuthSupabaseService} from '../core/services/auth-supabase.service';
import {Router, RouterLink} from '@angular/router';
import {showAlert} from '../../services/utils';
import {TextInputComponent} from '../text-input/text-input.component';
import {ButonComponent} from '../buton/buton.component';
import {NgIf} from '@angular/common';

function fieldsMatch(field1: string, field2: string, errorKey: string): ValidatorFn {
  return (group: AbstractControl): { [key: string]: any } | null => {
    const f1 = group.get(field1)?.value;
    const f2 = group.get(field2)?.value;
    return f1 === f2 ? null : { [errorKey]: true };
  };
}


@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    ButonComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './register-page.component.html',
  standalone: true,
  styleUrl: './register-page.component.css'
})

export class RegisterPageComponent {
  loginForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      repeatEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      location: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    },
    {
      validators: [
        fieldsMatch('email', 'repeatEmail', 'emailMismatch'),
        fieldsMatch('password', 'repeatPassword', 'passwordMismatch')
      ]
    }
  );


  errorMessage: string = '';

  constructor(private supabaseService: UserSupabaseService, private authService: AuthSupabaseService, private router: Router) {
  }

  goTo(pageName: string) {
    this.router.navigate([pageName])
  }

  async register() {
    if (this.loginForm.valid) {
      const credentials = {
        name: this.loginForm.value.name ?? '',
        phone: this.loginForm.value.phone ?? '',
        location: this.loginForm.value.location ?? '',
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? ''
      }
      const response = await this.authService.signUp(
        credentials.name,
        credentials.phone,
        credentials.location,
        credentials.email,
        credentials.password).then(r => {
          if (response != undefined) alert(JSON.stringify(response));
          else {
            alert("User created successfully.");
            this.router.navigate(["/login"]);
          }
      })
    } else {
      console.log('Errores en el formulario:', this.loginForm.errors);

      if (this.loginForm.errors?.['fieldsMismatch']) {
        console.warn('Emails or passwords do not match');
      } else {
        console.warn('Formulario inválido por otros motivos');
      }
    }
  }


}
