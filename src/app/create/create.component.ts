import {Component, Inject} from '@angular/core';
import {HeaderWithLoginComponent} from '../header-with-login/header-with-login.component';
import {FooterComponent} from '../footer/footer.component';
import {ButonComponent} from '../buton/buton.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {AuthSupabaseService} from '../core/services/auth-supabase.service';
import {AuthInterface, AuthUser} from '../core/interface/auth-interface';
import {UserSupabaseService} from '../core/services/user-supabase.service';
import {UserInterface} from '../core/interface/userInterface';
import {OfferSupabaseService} from '../core/services/offer-supabase.service';
import {Service, ServiceInterface} from '../core/interface/service-interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [HeaderWithLoginComponent, FooterComponent, ButonComponent, ReactiveFormsModule, NgClass],
  templateUrl: './create.component.html',
  standalone: true,
  styleUrl: './create.component.css'
})
export class CreateComponent {
  constructor(
    @Inject(AuthSupabaseService) private authInterface: AuthInterface,
    @Inject(UserSupabaseService) private userInterface: UserInterface,
    @Inject(OfferSupabaseService) private offerInterface: ServiceInterface,
    private router: Router
  ) {}
  smallText = '';
  largeText = '';
  smallCharCount = 0;
  largeCharCount = 0;

  formSubmitted = false;

  readonly SMALL_LIMIT = 250;
  readonly LARGE_LIMIT = 1000;

  onSmallCharInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    const text = input.value;

    if (text.length <= this.SMALL_LIMIT) {
      this.smallText = text;
      this.smallCharCount = text.length;
    } else {
      const trimmed = text.slice(0, this.SMALL_LIMIT);
      this.smallText = trimmed;
      this.smallCharCount = this.SMALL_LIMIT;

      setTimeout(() => input.value = trimmed, 0);
    }
  }
  onLargeCharInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    const text = input.value;

    if (text.length <= this.LARGE_LIMIT) {
      this.largeText = text;
      this.largeCharCount = text.length;
    } else {
      const trimmed = text.slice(0, this.LARGE_LIMIT);
      this.largeText = trimmed;
      this.largeCharCount = this.LARGE_LIMIT;

      setTimeout(() => input.value = trimmed, 0);
    }
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(1)]),
    price: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    experience: new FormControl('', [Validators.required]),
    short_description: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  async submitForm() {
    this.formSubmitted = true;
    let authUser : AuthUser;
    this.authInterface.getCurrentUser().subscribe({
      next : auth => {
        if(auth){authUser = auth}
      }
    })
    if (this.form.valid){

      const service:Service = {
        name: this.form.value.name || "",
        location: this.form.value.location || "",
        price: Number(this.form.value.price) || 0,
        experience: this.form.value.experience || "",
        short_description: this.form.value.short_description || "",
        description: this.form.value.description || ""
      };

      await this.offerInterface.createService(service).subscribe({
        next: service => {
          const serviceId:string = service.id || "";
          this.userInterface.publishOffer(authUser.uid, serviceId).subscribe()
        }
      })
      this.router.navigate(["/my-profile"]);

    }else{
      console.log("no ll");
      this.form.markAllAsTouched();
      const firstInvalidControl = document.querySelector('.invalid-field');
      if (firstInvalidControl) {
        (firstInvalidControl as HTMLElement).focus();
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}
