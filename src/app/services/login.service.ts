import { Trip } from '@models/Trip';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { take } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: boolean;
  user: User;
  tripsArray: Trip[];

  constructor(private http: HttpClient) { }

  setPastTrips(): Trip[] {
    if (!this.loggedIn) {
      this.tripsArray = [];
      return;
    }

    this.http.get(environment.baseUrl + ':' + environment.port + '/api/trip/userid/' + this.user.userId)
        .pipe(take(1))
        .subscribe((trips: Trip[]) => {
          console.log(trips);
          this.tripsArray = trips;
        });
  }
}
