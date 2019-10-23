import {Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css',
    './general.component.css'
  ]
})
export class HeaderComponent {
  optionsOverlay = false;
  extraOptions: string[];
  displayIcon = false;

  constructor() {
    this.extraOptions = ['Explore', 'Login'];
    this.displayIcon = !((window.innerWidth - 1 + 1) > 615);
  }

  onResize(eventData) {
    this.displayIcon = !((eventData.target.innerWidth - 1 + 1) > 615);
    this.optionsOverlay = false;
  }

  showOptions() {
    this.optionsOverlay = !this.optionsOverlay;
  }
}
