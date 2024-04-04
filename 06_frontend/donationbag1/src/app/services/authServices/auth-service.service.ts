import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  loggedIn$ = this.loggedIn.asObservable();
  jwt:string|null=localStorage.getItem('userToken')
  constructor() {}

  // Method to call when user logs in
  logIn() {
    if(!this.jwt){
      this.loggedIn.next(true);
    }
  }

  // Method to call when user logs out
  logOut() {
    this.loggedIn.next(false);
  }
}
