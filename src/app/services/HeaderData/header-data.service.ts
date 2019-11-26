import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderDataService {
  backgroundColor: string;

  customizeHeaderForHomePage() {
    this.backgroundColor = 'transparent';
  }

  customizeHeaderForPlannerPage() {
    this.backgroundColor = 'var(--main-theme-color)';
  }

  customizeHeaderForProfilePage() {
    this.backgroundColor = 'var(--main-theme-color)';
  }

  customizeHeaderForNotFoundPage() {
    this.backgroundColor = 'var(--main-theme-color)';
  }
}
