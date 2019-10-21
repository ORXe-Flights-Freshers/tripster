import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css',
    './general.component.css'
  ]
})
export class HeaderComponent implements OnInit {
  optionsOverlay = false;
  extraOptions: string[];

  @ViewChild('logo', { static: false })
  logo: ElementRef;

  constructor() {
    this.extraOptions = ['Explore', 'Login'];
  }

  ngOnInit() {
  }

  showOptions() {
    this.optionsOverlay = !this.optionsOverlay;
  }

  iconOnFocus() {
    console.log('Focused');
  }
}
