import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-text-input',
  imports: [],
  templateUrl: './text-input.component.html',
  standalone: true,
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
}

