import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ButonComponent} from '../buton/buton.component';
import {SupabaseService} from '../../services/supabase.service';
import {HeaderComponent} from '../header/header.component';
import {HeaderWithLoginComponent} from '../header-with-login/header-with-login.component';
import {Router} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-profile',
  imports: [
    NgOptimizedImage,
    ButonComponent,
    HeaderComponent,
    HeaderWithLoginComponent,
    FooterComponent
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  title = 'profile'
  constructor(private supabaseService: SupabaseService, protected router : Router) {}
  name: string = '';
  email: string = '';
  location: string = '';
  phone: string = '';
  imageSrc: string = '';

  async ngOnInit() {
    const userData = await this.supabaseService.getUserData();
    this.name = JSON.stringify(userData["userData"]["name"]);
    this.email = JSON.stringify(userData["userData"]["email"]);
    this.location = JSON.stringify(userData["userData"]["location"]);
    this.phone = JSON.stringify(userData["userData"]["phone"]);
    this.name = this.name.replace(/['"]+/g, '');
    this.email = this.email.replace(/['"]+/g, '');
    this.location = this.location.replace(/['"]+/g, '');
    this.location = this.location.replace(/['"]+/g, '');
    this.phone = this.phone.replace(/['"]+/g, '');

    const photo = userData["userData"]["photo"];
    if (photo == '') {
      this.imageSrc = "./imageLogo.png";
    } else {
      this.imageSrc = photo;
    }
  }

  changeProfilePhoto(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageSrc = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  logout() {
    this.supabaseService.signOut();
    this.router.navigate(['login']);
  }

  goTo(component: any) {
    this.router.navigate([component]);
  }

  selectedFile: File | null = null;

  uploadCV(fileInput: HTMLInputElement) {
    fileInput.click(); // abre el explorador de archivos
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
        alert(`PDF selected: ${file.name}`);
      } else {
        alert('Solo se permiten archivos PDF');
      }
    }
  }


  protected readonly alert = alert;
}




