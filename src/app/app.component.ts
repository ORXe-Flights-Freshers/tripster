import {Component, OnInit} from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { LoginService } from '@services/login.service';
import { User } from '@models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tripster';
  constructor(private authService: AuthService, private loginService: LoginService) {
  }
  ngOnInit() {
    this.authService.authState.subscribe((socialUser: SocialUser) => {
      if (socialUser) {
        const user: User = {
          name: socialUser.name,
          userId: socialUser.id,
          email: socialUser.email,
          photoUrl: socialUser.photoUrl
        };
        this.loginService.user = user;
        this.loginService.loggedIn = true;
      } else {
        this.loginService.user = null;
        this.loginService.loggedIn = false;
      }
      console.log(socialUser);
      console.log(this.loginService.user);
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log(document.cookie);
  }
  signOut(): void {
    this.authService.signOut();
    console.log(document.cookie);
  }
}
