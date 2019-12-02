import { Injectable } from '@angular/core';
import {NavigatorService} from '@services/navigator.service';
declare let googleAnalytics;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(public navigator: NavigatorService) {
    this.navigator.activeTabSubject.subscribe(arg => {
      this.eventEmitter('Planner', arg);
    });
   }
  public eventEmitter(eventCategory: string,
                      eventAction: string,
                      eventLabel: string = null,
                      eventValue: number = null) {
      googleAnalytics('send', 'event', {
        eventCategory,
        eventLabel,
        eventAction,
        eventValue
      });

    }



}
