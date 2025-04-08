import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-buton',
  imports: [],
  templateUrl: './buton.component.html',
  standalone: true,
  styleUrl: './buton.component.css'
})
export class ButonComponent {
  @Input() text: string = "Botón";
  @Output() action: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.action.emit()
  }
}
