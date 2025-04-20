import { Component } from '@angular/core';
import {FooterComponent} from '../../footer/footer.component';
import {HeaderWithLoginComponent} from '../../header-with-login/header-with-login.component';
import {OfferPreviewComponent} from '../../offer-preview/offer-preview.component';

@Component({
  selector: 'app-my-offers',
  imports: [
    FooterComponent,
    HeaderWithLoginComponent,
    OfferPreviewComponent
  ],
  templateUrl: './my-offers.component.html',
  styleUrl: './my-offers.component.css'
})
export class MyOffersComponent {

}
