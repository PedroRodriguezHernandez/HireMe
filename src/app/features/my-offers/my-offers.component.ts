import {Component, OnInit} from '@angular/core';
import {FooterComponent} from '../../footer/footer.component';
import {HeaderWithLoginComponent} from '../../header-with-login/header-with-login.component';
import {OfferPreviewComponent} from '../../offer-preview/offer-preview.component';
import {NgForOf} from "@angular/common";
import {Service} from "../../core/interface/service-interface";
import {SupabaseService} from "../../../services/supabase.service";
import {forkJoin} from "rxjs";
import {OfferSupabaseService} from "../../core/services/offer-supabase.service";

@Component({
  selector: 'app-my-offers',
  imports: [
    FooterComponent,
    HeaderWithLoginComponent,
    OfferPreviewComponent,
    NgForOf
  ],
  templateUrl: './my-offers.component.html',
  styleUrl: './my-offers.component.css'
})
export class MyOffersComponent implements OnInit{
  services: Service[] = [];

  constructor(
      private supabaseService: SupabaseService,
      private offerService: OfferSupabaseService
      ) { }

  async ngOnInit() {
    const result = await this.supabaseService.getMyPosts();

    if ('myPosts' in result) {
      const serviceIds = result.myPosts;

      if (serviceIds.length === 0) return;

      forkJoin(serviceIds.map(id => this.offerService.getServiceById(id)))
          .subscribe({
            next: (services) => {
              this.services = services;
              console.log('Loaded services:', services);
            },
            error: (err) => {
              console.error('Error loading services:', err);
            }
          });
    } else {
      console.error('Error retrieving my_posts:', result.error);
    }
  }

}
