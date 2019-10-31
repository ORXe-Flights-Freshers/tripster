import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderLinksService {
  links: string[];

  constructor() { }

  generateLinksForHomePage() {
    this.links = [];
  }

  generateLinksForPlannerPage() {
    this.links = ['Share'];
  }
}
