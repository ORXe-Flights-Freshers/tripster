import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { LoginService } from '@services/login.service';
import { User } from '@models/User';
import {Router, NavigationEnd} from '@angular/router';
import { TripService } from '@services/trip.service';
import {AnalyticsService} from '@services/analytics.service';

declare let ga: (arg1: string, arg2: string, arg3?: any) => void;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tripster';
  constructor(private authService: AuthService,
              public router: Router,
              private loginService: LoginService,
              private tripService: TripService,
              public analytics: AnalyticsService) {
  }
  ngOnInit() {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');

      }

    });
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
        this.loginService.firstName = socialUser.firstName;
        this.loginService.loggedIn = true;
        this.loginService.idToken = socialUser.idToken;
        this.loginService.isLoggedInSubject.next(true);
        this.loginService.saveUser(user);
        this.tripService.setCanModifyTrip();
        // console.log(socialUser);
      } else {
        this.loginService.user = null;
        this.loginService.firstName = '';
        this.loginService.loggedIn = false;
        this.loginService.idToken = '';
        this.loginService.isLoggedInSubject.next(false);
        this.tripService.setCanModifyTrip();
      }
      this.loginService.setPastTrips();
    });
  }
}
