import {Component, OnInit} from '@angular/core';
import {HeaderWithLoginComponent} from '../../header-with-login/header-with-login.component';
import {FooterComponent} from '../../footer/footer.component';
import {OfferPreviewComponent} from '../../offer-preview/offer-preview.component';
import {Service} from '../../core/interface/service-interface';
import {OfferSupabaseService} from '../../core/services/offer-supabase.service';
import {NgForOf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-initial-page',
  imports: [
    HeaderWithLoginComponent,
    FooterComponent,
    OfferPreviewComponent,
    NgForOf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  services: Service[] = [];

  constructor(
    private offerService: OfferSupabaseService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const search = (params['search'] || '').toLowerCase();

      this.offerService.getServices().subscribe({
        next: (services) => {
          if (search) {
            this.services = services.filter(service =>
              service.name?.toLowerCase().includes(search) ||
              service.description?.toLowerCase().includes(search)
            );
          } else {
            this.services = services;
          }

          console.log('Filtered Services:', this.services);
        },
        error: (error) => {
          console.error('Error fetching services:', error);
        }
      });
    });
  }
}
