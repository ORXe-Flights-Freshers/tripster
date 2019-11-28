import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {HeaderDataService} from '@services/HeaderData/header-data.service';
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

  constructor(public extraOptions: HeaderDataService,
              public loginService: LoginService) {
  }
}
