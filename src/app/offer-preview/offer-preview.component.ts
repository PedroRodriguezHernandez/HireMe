import { Component } from '@angular/core';
import {ButonComponent} from '../buton/buton.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offer-preview',
  imports: [
    ButonComponent
  ],
  templateUrl: './offer-preview.component.html',
  styleUrl: './offer-preview.component.css'
})
export class OfferPreviewComponent {
  title: string = "Offer Title";

  constructor(private router: Router) {}

  dateToDays() {
    return "X days";
  }

  getLocation() {
    return "35019, Las Palmas de Gran Canaria, ES";
  }

  getSalary() {
    return "X€/h on-site";
  }

  getExperience() {
    return "A lot of";
  }

  getDescription() {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan lacinia lectus. Suspendisse pulvinar dui felis. Sed vel venenatis nisl. Sed elit odio, lacinia ut placerat et, vestibulum vitae leo. Suspendisse non justo a tellus interdum porttitor. Etiam a tristique enim, at mattis ipsum.";
  }

  goTo(pageName: string) {
    this.router.navigate([pageName])
  }

  deleteOffer() {

  }
}
