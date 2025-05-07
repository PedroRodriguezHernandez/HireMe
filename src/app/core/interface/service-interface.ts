import {Observable} from 'rxjs';

export interface Service{
  id?: string;
  creator_id?:string;
  name: string;
  location: string;
  price: number;
  experience: string;
  short_description: string;
  description: string;
  telephone_number?: string;
  created_at?: string;
}

export interface ServiceInterface {
  getServices(): Observable<Service[]>;
  getServiceById(id: string): Observable<Service>;
  createService(offer:Service): Observable<Service>;
  deleteService(id: string): Observable<void>;
}

