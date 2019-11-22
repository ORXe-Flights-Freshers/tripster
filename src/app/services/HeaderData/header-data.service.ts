import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderDataService {
  links: { name: string, url: string }[];
  backgroundColor: string;

  constructor() {
    this.links = [];
  }

  customizeHeaderForHomePage() {
    this.backgroundColor = 'transparent';
    this.links = [
      {name: 'Sign up', url: '/signup'},
      {name: 'Sign in', url: '/signin'}
    ];
  }

  customizeHeaderForPlannerPage() {
    this.backgroundColor = 'var(--main-theme-color)';
    this.links = [
      {name: 'Sign in', url: '/signin'},
    ];
  }

  customizeHeaderForProfilePage() {
    this.backgroundColor = 'var(--main-theme-color)';
    this.links = [
      {name: 'Log out', url: '/logout'},
    ];
  }

  customizeHeaderForNotFoundPage() {
    this.backgroundColor = 'var(--main-theme-color)';
    this.links = [
      {name: 'Back', url: '/'},
    ];
  }
}
