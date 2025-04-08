import { Component } from '@angular/core';
import {HeaderWithLoginComponent} from '../header-with-login/header-with-login.component';
import {FooterComponent} from '../footer/footer.component';
import {ButonComponent} from '../buton/buton.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-create',
  imports: [HeaderWithLoginComponent, FooterComponent, ButonComponent, ReactiveFormsModule, NgClass],
  templateUrl: './create.component.html',
  standalone: true,
  styleUrl: './create.component.css'
})
export class CreateComponent {
  smallText = '';
  largeText = '';
  smallCharCount = 0;
  largeCharCount = 0;

  formSubmitted = false;

  readonly SMALL_LIMIT = 250;
  readonly LARGE_LIMIT = 1000;

  onSmallCharInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    const text = input.value;

    if (text.length <= this.SMALL_LIMIT) {
      this.smallText = text;
      this.smallCharCount = text.length;
    } else {
      const trimmed = text.slice(0, this.SMALL_LIMIT);
      this.smallText = trimmed;
      this.smallCharCount = this.SMALL_LIMIT;

      setTimeout(() => input.value = trimmed, 0);
    }
  }
  onLargeCharInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    const text = input.value;

    if (text.length <= this.LARGE_LIMIT) {
      this.largeText = text;
      this.largeCharCount = text.length;
    } else {
      const trimmed = text.slice(0, this.LARGE_LIMIT);
      this.largeText = trimmed;
      this.largeCharCount = this.LARGE_LIMIT;

      setTimeout(() => input.value = trimmed, 0);
    }
  }

  form = new FormGroup({
    title: new FormControl('', [Validators.required,Validators.minLength(1)]),
    price: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    experience: new FormControl('', [Validators.required]),
    short: new FormControl('', [Validators.required]),
    large: new FormControl('', [Validators.required]),
  });

  submitForm() {
    this.formSubmitted = true;
    if (this.form.valid){
      const jsonData = this.form.value;
      console.log('✅ JSON generado:', jsonData);
    }else{
      console.log("no ll");
      this.form.markAllAsTouched();
      const firstInvalidControl = document.querySelector('.invalid-field');
      if (firstInvalidControl) {
        (firstInvalidControl as HTMLElement).focus();
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}
