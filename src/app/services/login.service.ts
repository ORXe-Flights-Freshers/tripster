import { Trip } from '@models/Trip';
import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { TripService } from './trip.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: boolean;
  user: User;
  firstName = ' ';
  tripsArray: Trip[];
  pastTripsAvailable = true;
  canModifyTrip: boolean;
  constructor(private http: HttpClient, private authService: AuthService) {}

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

    this.pastTripsAvailable = false;
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
        this.pastTripsAvailable = true;
      });
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut() {
    this.authService.signOut(true);
  }
}
