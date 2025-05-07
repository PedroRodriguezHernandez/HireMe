import {Observable} from 'rxjs';

export interface User{
  id?: string;
  name: string;
  email: string;
  photo?: string;
  location?: string;
  phone?: string;
  favorites?: string[];
  my_posts?: string[];
}

export interface UserInterface {
  publishOffer(id: string,uid_Post:string): Observable<boolean>;
  saveOffer(id: string,uid_Post:string): Observable<boolean>;
  getUser(id: string):Observable<User>;
  updateUser(id: string,user: Partial<User>): Observable<User>;
}
