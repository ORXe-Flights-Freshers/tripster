import {Injectable} from '@angular/core';
import {AnalyticsService} from '@services/analytics.service';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NavigatorService {
  activeTabSubject = new BehaviorSubject<string>('timeline');
  profileActiveTab = 'dashboard';
  profileActiveTabSubject = new BehaviorSubject<string>(this.profileActiveTab);

  constructor() {
  }


}
