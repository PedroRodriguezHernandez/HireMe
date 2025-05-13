import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ButonComponent} from '../buton/buton.component';
import {SupabaseService} from '../../services/supabase.service';
import {HeaderComponent} from '../header/header.component';
import {HeaderWithLoginComponent} from '../header-with-login/header-with-login.component';
import {Router} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';
import {supabase} from '../core/services/supabase.service';

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
    const limpiarCampo = (valor: any): string => {
      const limpio = JSON.stringify(valor).replace(/['"]+/g, '').trim();
      return limpio === '' ? '__' : limpio;
    };

    const userData = await this.supabaseService.getUserData();

    this.name     = limpiarCampo(userData["userData"]["name"]);
    this.email    = limpiarCampo(userData["userData"]["email"]);
    this.location = limpiarCampo(userData["userData"]["location"]);
    this.phone    = limpiarCampo(userData["userData"]["phone"]);


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

async onPhotoSelected(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      alert('You must select an image.');
      return;
    }

    const fileName = `${Date.now()}_${file.name}`;
    const user = await this.supabaseService.getUserData();
    const userId = user["userData"]["id"];

    const timestamp = Date.now();
    const filePath = `${userId}/avatar_${timestamp}.jpg`;

    if (!userId) {
      alert('User not authenticated.');
      return;
    }

    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Error al subir la imagen:', uploadError);
      return;
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(filePath);

    const avatarUrl = publicUrlData.publicUrl;
    const { error: updateError } = await supabase
      .from('users')
      .update({ photo: avatarUrl })
      .eq('id', userId);

    this.imageSrc = `${avatarUrl}?t=${Date.now()}`;
    window.location.reload();
  }
}


  logout() {
    this.supabaseService.signOut();
    this.router.navigate(['']);
  }

  goTo(component: any) {
    this.router.navigate([component]);
  }

  selectedFile: File | null = null;

  uploadCV(fileInput: HTMLInputElement) {
    fileInput.click();
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

  updateProfile() {
    const fields = [
      { id: 'ProfileName', newId: 'nombreUsuario' },
      { id: 'ProfileEmail', newId: 'emailUsuario' },
      { id: 'ProfileLocation', newId: 'ubicacionUsuario' },
      { id: 'ProfilePhone', newId: 'telefonoUsuario' }
    ];

    for (const field of fields) {
      const element = document.getElementById(field.id);

      if (element) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = element.textContent?.trim() || '';
        input.id = field.newId;

        input.className = element.className;

        element.replaceWith(input);
      }
    }
  }
}




