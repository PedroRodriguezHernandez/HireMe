import { Component } from '@angular/core';
import {HeaderWithLoginComponent} from '../header-with-login/header-with-login.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-create',
  imports: [HeaderWithLoginComponent, FooterComponent],
  templateUrl: './create.component.html',
  standalone: true,
  styleUrl: './create.component.css'
})
export class CreateComponent {

}
