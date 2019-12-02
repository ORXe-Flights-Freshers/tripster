import { LoginService } from '@services/login.service';
import { Component, OnInit, HostListener } from '@angular/core';
import {AnalyticsService} from '@services/analytics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  windowWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.windowWidth = window.innerWidth;
  }

  constructor(public loginService: LoginService,
              public analytics: AnalyticsService) { }

  ngOnInit() {
    this.analytics.eventEmitter('Profile', 'User Details');
  }

}
