import { Component } from '@angular/core';
import {HeaderWithLoginComponent} from '../../header-with-login/header-with-login.component';
import {FooterComponent} from '../../footer/footer.component';
import {OfferPreviewComponent} from '../../offer-preview/offer-preview.component';
import {Service} from '../../core/interface/service-interface';
import {OfferSupabaseService} from '../../core/services/offer-supabase.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    HeaderWithLoginComponent,
    FooterComponent,
    OfferPreviewComponent,
    NgForOf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  services: Service[] = [];

  constructor(private offerService: OfferSupabaseService) {}

  ngOnInit() {
    this.offerService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        console.log('Services:', services);
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      }
    });
  }
}
