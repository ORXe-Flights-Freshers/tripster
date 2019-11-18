import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {HeaderDataService} from '../../../services/HeaderData/header-data.service';

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

  constructor(public extraOptions: HeaderDataService) {
    this.windowWidth = window.innerWidth;
  }

  getWidth() {
    if (this.windowWidth < 615) {
      return '30%';
    }

    if (this.extraOptions.links.length <= 1 && this.windowWidth > 1210) {
      return '5%';
    }

    if (this.extraOptions.links.length <= 1 && this.windowWidth > 800) {
      return '8%';
    }

    if (this.extraOptions.links.length <= 1 && this.windowWidth > 600) {
      return '11%';
    }

    if (this.extraOptions.links.length === 2 && this.windowWidth > 950) {
      return '17%';
    }

    if (this.extraOptions.links.length === 2 && this.windowWidth > 800) {
      return '25%';
    }

    if (this.extraOptions.links.length === 2 && this.windowWidth > 615) {
      return '29%';
    }

    return '40%';
  }
}
