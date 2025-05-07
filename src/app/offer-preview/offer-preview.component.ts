import {Component, Input} from '@angular/core';
import {ButonComponent} from '../buton/buton.component';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {Service} from '../core/interface/service-interface';

@Component({
  selector: 'app-offer-preview',
  imports: [
    ButonComponent,
    NgIf
  ],
  templateUrl: './offer-preview.component.html',
  styleUrl: './offer-preview.component.css'
})
export class OfferPreviewComponent {
  @Input() myOfferFlag: boolean = true;
  @Input() service!: Service;
  isFavorite: boolean = false;

  constructor(private router: Router) {}

  dateToDays() {
    const date = new Date(this.service.created_at || new Date());
    const today = new Date();
    const timeDiff = Math.abs(today.getTime() - date.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  goTo(pageName: string) {
    this.router.navigate([pageName])
  }

  deleteOffer() {

  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

}
