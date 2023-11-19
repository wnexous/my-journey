import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isLoggedIn = false;

  constructor() { }

  public Login() {
    const token = window.localStorage.getItem('token')
    const uuid: any = window.localStorage.getItem('uuid')

    if(token && uuid) {
      this.isLoggedIn = true;
    }
  }

  public LoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
