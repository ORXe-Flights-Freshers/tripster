import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {HeaderDataService} from '../../../services/HeaderData/header-data.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { LoginService } from '@services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css',
    './general.component.css'
  ]
})
export class HeaderComponent {
  private windowWidth;

  @ViewChild('extras', {static: false}) extras: ElementRef;
  @ViewChild('burger', {static: false}) burger: ElementRef;

  @HostListener('document:click', ['$event']) navLinksToggle(event: Event) {
    const {target} = event;

    if (this.burger.nativeElement.contains(target)) {
      (this.extras.nativeElement as HTMLUListElement).classList.toggle('nav-active');
    } else {
      if ((this.extras.nativeElement as HTMLUListElement).classList.contains('nav-active')) {
        (this.extras.nativeElement as HTMLUListElement).classList.remove('nav-active');
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.windowWidth = (event.target as Window).innerWidth;
  }

  constructor(public extraOptions: HeaderDataService, private authService: AuthService, public loginService: LoginService) {
    this.windowWidth = window.innerWidth;
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut() {
    this.authService.signOut(true);
  }
}
