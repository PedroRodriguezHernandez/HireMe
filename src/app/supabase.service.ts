import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async signUp(name: string, email: string, repeatEmail: string, password: string, repeatPassword: string) {
    if (email !== repeatEmail) {
      return 'Emails do not match';
    }
    if (password !== repeatPassword) {
      return 'Passwords do not match';
    }
    const { data: { user, session }, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return error.message;
    }

    const { error: insertError } = await this.supabase
      .from('users')
      .insert([
        {
          id: user?.id,
          name: name,
          photo: '../assets/default-profile.png',
          location: '',
          phone: '',
          favorites: [],
          my_posts: [],
        },
      ]);

    if (insertError) {
      return `Error creating user profile: ${insertError.message}`;
    }

    return { user, session };
  }
}
