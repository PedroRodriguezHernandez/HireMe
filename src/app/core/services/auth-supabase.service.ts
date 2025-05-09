import { Injectable } from '@angular/core';
import {from, map, Observable} from 'rxjs';
import {supabase} from './supabase.service';
import {AuthInterface, AuthUser} from '../interface/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthSupabaseService implements AuthInterface {

  login(user: string, password: string): Observable<{ uid: string; userName: string }> {
    return from(
      supabase.auth.signInWithPassword({ email: user, password })
    ).pipe(
      map(({ data, error }) => {
        if (error || !data.user) throw error || new Error('Login failed');
        return {
          uid: data.user.id,
          userName: data.user.email || ''
        };
      })
    );
  }

  async signUp(name: string, phone: string, location: string,  email: string, password: string): Promise<{ error?: string } | any | undefined> {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      return { error: error.message };
    }
    const userdata = data["user"];
    if (userdata) {
      const id = userdata["id"];
      const { data, error } = await supabase
        .from('users')
        .update({
          name: name,
          email: email,
          location: location,
          phone: phone,
        })
        .eq('id', id)
    }
  }



  logout(): void {
    supabase.auth.signOut();
  }

  getCurrentUser(): Observable<AuthUser | null> {
    const user = supabase.auth.getUser();
    return from(user).pipe(
      map(({ data }) => {
        if (!data.user) return null;
        return {
          uid: data.user.id,
          userName: data.user.email || ''
        };
      })
    );
  }

}

