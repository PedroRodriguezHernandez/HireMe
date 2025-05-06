import { Component } from '@angular/core';
import {HeaderWithLoginComponent} from '../../header-with-login/header-with-login.component';
import {FooterComponent} from '../../footer/footer.component';
import {OfferPreviewComponent} from '../../offer-preview/offer-preview.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeaderWithLoginComponent,
    FooterComponent,
    OfferPreviewComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
