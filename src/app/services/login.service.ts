import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedIn: boolean;
  user: User;
  constructor(private http: HttpClient) {}

  saveUser(user: User) {
    this.http
      .post(environment.baseUrl + ':' + environment.port + '/api/user', user)
      .subscribe();
  }
}
