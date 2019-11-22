import { Trip } from '@models/Trip';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: boolean;
  user: User;

  constructor(private http: HttpClient) { }

  getPastTrips(): Trip[] {
    return [];
    // this.http.get('http://172.16.5.202:5001/api/')
  }
}
