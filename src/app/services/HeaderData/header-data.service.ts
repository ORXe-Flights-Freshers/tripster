import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderDataService {
  links: { name: string, url: string }[];
  backgroundColor: string;

  constructor() { }

  customizeHeaderForHomePage() {
    this.backgroundColor = 'transparent';
    this.links = [
      { name: 'Sign up', url: '/signup' },
      { name: 'Sign in', url: '/signin' }
    ];
  }

  customizeHeaderForPlannerPage() {
    this.backgroundColor = '#0B1240';
    this.links = [
      { name: 'Sign in', url: '/signin' },
    ];
  }
}
