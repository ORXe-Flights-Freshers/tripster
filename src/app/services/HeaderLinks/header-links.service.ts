import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderLinksService {
  links: { [name: string]: string }[];

  constructor() { }

  generateLinksForHomePage() {
    this.links = [
      { 'Sign up': '/signup' },
      { 'Sign in': '/signin' },
    ];
  }

  generateLinksForPlannerPage() {
    this.links = [
      { 'Share ': '/planner/:id/share'},
    ];
  }
}
