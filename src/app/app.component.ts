import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { LoginService } from '@services/login.service';
import { User } from '@models/User';
import { TripService } from '@services/trip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tripster';
  constructor(private authService: AuthService,
              private loginService: LoginService,
              private tripService: TripService) {
  }
  ngOnInit() {
    this.authService.authState.subscribe((socialUser: SocialUser) => {
      if (socialUser) {
        const user: User = {
          name: socialUser.name,
          userId: socialUser.id,
          email: socialUser.email,
          photoUrl: socialUser.photoUrl,
          provider: socialUser.provider,
        };
        this.loginService.user = user;
        this.loginService.loggedIn = true;
        this.loginService.saveUser(user);
        this.tripService.setCanModifyTrip();
        // console.log(socialUser);
      } else {
        this.loginService.user = null;
        this.loginService.loggedIn = false;
        this.tripService.setCanModifyTrip();
      }
      this.loginService.setPastTrips();
    });
  }
}
