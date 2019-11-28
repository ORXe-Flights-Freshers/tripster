import { Trip } from '@models/Trip';
import { Injectable } from '@angular/core';
import { User } from '@models/User';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import {AnalyticsService} from '@services/analytics.service';
import { Subject } from 'rxjs';
import { LoginComponent } from 'app/shared/components/login/login.component';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: boolean;
  isLoggedInSubject = new Subject<boolean>();
  user: User;
  firstName = ' ';
  tripsArray: Trip[];
  pastTripsAvailable = true;
  canModifyTrip: boolean;
  constructor(private http: HttpClient,
              private authService: AuthService,
              public analytics: AnalyticsService,
              private dialog: MatDialog) {}

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

  openLoginDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '510px';

    const dialogRef = this.dialog.open(
      LoginComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(_ => {});
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.analytics.eventEmitter('User', 'Signin');
  }
  signOut() {
    this.authService.signOut(true);
    this.analytics.eventEmitter('User', 'SignOut');

  }
}
