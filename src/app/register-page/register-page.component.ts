import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {SupabaseService} from '../../services/supabase.service';
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
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    },
    {
      validators: [
        fieldsMatch('email', 'repeatEmail', 'emailMismatch'),
        fieldsMatch('password', 'repeatPassword', 'passwordMismatch')
      ]
    }
  );


  errorMessage: string = '';

  constructor(private router: Router) {
  }

  goTo(pageName: string) {
    this.router.navigate([pageName])
  }

  register() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? ''
      };

      console.log('Formulario válido, registrando con:', credentials);

      // Aquí haces el registro con Supabase o el backend (si lo implementas)
      // Luego rediriges:
      this.router.navigate(['/my-profile']);
    } else {
      // Verificar errores de coincidencia
      console.log('Errores en el formulario:', this.loginForm.errors);

      if (this.loginForm.errors?.['fieldsMismatch']) {
        console.warn('Emails or passwords do not match');
      } else {
        console.warn('Formulario inválido por otros motivos');
      }
    }
  }


}
