import { Injectable } from '@angular/core';
import {Service, ServiceInterface} from '../interface/service-interface';
import {defer, from, map, Observable} from 'rxjs';
import {supabase} from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class OfferSupabaseService implements ServiceInterface {

    getServices(): Observable<Service[]> {
      return defer(async () => {
        const {data: offer, error} = await supabase
          .from('services')
          .select('*')
        if (error){
          throw error;
        }
        return offer as Service[]
      });
    }

    getServiceById(id: string): Observable<Service> {
      return from(
        supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single()
      ).pipe(
        map(({data, error}) => {
          if (error) throw error;
          return data as Service;
        })
      );
    }

    createService(offer: Service): Observable<Service> {
      return from(
        (async () =>{
          const {data , error} = await supabase
            .from('services')
            .insert([{
              name: offer.name,
              price: offer.price,
              location: offer.location,
              experience: offer.experience,
              short_description: offer.short_description,
              description: offer.description,
              telephone_number: offer.telephone_number
            }])
            .select();

          if (error){
            throw error;
          }

          return data?.[0] as Service;
        })()
      );
    }

    deleteService(id: string): Observable<void> {
      return from(
        (async () =>{
          const { data, error } = await supabase
            .from('services')
            .delete()
            .eq('id', id)
          if (error) {
            throw error;
          }
        })()
      );
    }
}
