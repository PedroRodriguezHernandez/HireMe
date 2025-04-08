import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './text-input.component.html',
  standalone: true,
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
}

