import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-buton',
  imports: [],
  templateUrl: './buton.component.html',
  standalone: true,
  styleUrl: './buton.component.css'
})
export class ButonComponent {
  @Input() text: string = "Botón";
}
