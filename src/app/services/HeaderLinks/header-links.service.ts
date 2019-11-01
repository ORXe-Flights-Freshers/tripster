import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderLinksService {
  links: { name: string, url: string }[];

  constructor() { }

  generateLinksForHomePage() {
    this.links = [
      { name: 'Sign up', url: '/signup' },
      { name: 'Sign in', url: '/signin' }
    ];
  }

  generateLinksForPlannerPage() {
    this.links = [
      { name: 'Share', url: '/planner/:id/share' },
    ];
  }
}
