import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {
  activeTab = 'timeline';
  profileActiveTab = 'past-trips';

  constructor() {
  }
}
