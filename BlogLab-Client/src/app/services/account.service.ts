import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApplicationUserCreate } from '../models/account/application-user-create.model';
import { ApplicationUserLogin } from '../models/account/application-user-login.model';
import { ApplicationUser } from '../models/account/application-user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSubject$: BehaviorSubject<ApplicationUser | null>

  constructor(private http:HttpClient) { 
    this.currentUserSubject$ = new BehaviorSubject<ApplicationUser | null>(JSON.parse(localStorage.getItem('blogLab-currentUser') || '{}'));
  }

  login = (model:ApplicationUserLogin): Observable<ApplicationUser> => {
    return this.http.post<ApplicationUser>(`${environment.webApi}/Account/login`,model)
    .pipe(
      map((user:ApplicationUser) => {
        if(user) {
          localStorage.setItem('blogLab-currentUser', JSON.stringify(user))
          this.currentUserSubject$.next(user)
        }
        return user
    }))
  }

  register = (model:ApplicationUserCreate): Observable<ApplicationUser> => {
   return this.http.post<ApplicationUser>(`${environment.webApi}/Account/register`,model)
    .pipe(
      map((user:ApplicationUser) => {
        if(user) {
          localStorage.setItem('blogLab-currentUser', JSON.stringify(user))
          this.currentUserSubject$.next(user)
        }
        return user
    }))
  }

  logOut = () => {
    localStorage.removeItem('blogLab-currentUser')
    this.currentUserSubject$.next(null)
  }

  public get currentUserValue() : ApplicationUser | null {
    return this.currentUserSubject$.value  
  }

}

