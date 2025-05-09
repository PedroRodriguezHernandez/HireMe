import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async signUp(name: string, phone: string, location: string, email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      return { error: error.message };
    }

    const user = data?.user;

    if (!user) {
      return { error: 'No se pudo obtener el usuario después del registro' };
    }

    const { error: insertError } = await this.supabase
      .from('users')
      .insert([
        {
          id: user.id,
          name: name,
          email: email,
          photo: '',
          location: location,
          phone: phone,
          favorites: [],
          my_posts: [],
        },
      ]);

    if (insertError) {
      return { error: `Error al crear perfil de usuario: ${insertError.message}` };
    }

    return { user, session: data.session };
  }

  async signIn(credentials: {email: string, password: string}) {
    return new Promise(async (resolve, reject) => {
      const {error, data} = await this.supabase.auth.signInWithPassword(credentials);
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();

    this.supabase.getChannels().map(sup => {
      this.supabase.removeChannel(sup);
    });

    await this.router.navigate(['']);
  }

  async getUserData() {
    const { data: { user }, error: authError } = await this.supabase.auth.getUser();

    if (authError || !user) {
      return { error: 'No authenticated user found' };
    }

    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      return { error: `Error fetching user data: ${error.message}` };
    }

    return { userData: data };
  }

  async getMyPosts(): Promise<{ myPosts: string[] } | { error: string }> {
    const { data: { user }, error: authError } = await this.supabase.auth.getUser();

    if (authError || !user) {
      return { error: 'No authenticated user found' };
    }

    const { data, error } = await this.supabase
      .from('users')  // Asegúrate de que esta es la tabla correcta
      .select('my_posts')
      .eq('id', user.id)
      .single();

    if (error) {
      return { error: `Error fetching my_posts: ${error.message}` };
    }

    return { myPosts: data.my_posts ?? [] };
  }

}
