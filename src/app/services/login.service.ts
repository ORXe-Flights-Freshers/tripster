import { Trip } from '@models/Trip';
import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: boolean;
  user: User;
  tripsArray: Trip[];
  constructor(private http: HttpClient) {}

  saveUser(user: User) {
    this.http
      .post(environment.baseUrl + ':' + environment.port + '/api/user', user)
      .subscribe();
  }

  setPastTrips(): Trip[] {
    if (!this.loggedIn) {
      this.tripsArray = [];
      return;
    }

    this.http
      .get(
        environment.baseUrl +
          ':' +
          environment.port +
          '/api/trip/userid/' +
          this.user.userId
      )
      .pipe(take(1))
      .subscribe((trips: Trip[]) => {
        this.tripsArray = trips;
      });
  }
}
