import { Injectable } from '@angular/core';
import {User, UserInterface} from '../interface/userInterface';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {supabase} from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class UserSupabaseService implements UserInterface{
  getUser(id: string): Observable<User> {
    return from(
      supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as User;
      })
    );
  }


  publishOffer(id: string, uid_Post: string): Observable<boolean> {
    return this.getUser(id).pipe(
      switchMap((user) => {
        const myOffers = user.my_posts || [];
        user.my_posts = [...myOffers,uid_Post];
        this.updateUser(id,user)
        return of(true)
      }),
      catchError(err => {
        return of(false);
      })
    );
  }

  saveOffer(id: string, uid_Post: string): Observable<boolean> {
    return this.getUser(id).pipe(
      switchMap((user) => {
        const favorites = user.favorites || [];
        user.favorites = [...favorites,uid_Post];
        this.updateUser(id,user)
        return of(true)
      }),
      catchError(err => {
        return of(false);
      })
    );
  }


  updateUser(id: string, user: Partial<User>): Observable<User> {
    return from(
      (async () => {
        const { data, error } = await supabase
          .from('users')
          .update({
            name: user.name,
            email: user.email,
            photo: user.photo,
            location: user.location,
            phone: user.phone,
            favorites: user.favorites,
            my_posts: user.my_posts,
          })
          .eq('id', id)
          .select();

        if (error) {
          throw error;
        }

        return data?.[0] as User;
      })()
    );
  }

}
