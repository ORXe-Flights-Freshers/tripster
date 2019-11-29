import { LoginService } from '@services/login.service';
<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import {AnalyticsService} from '@services/analytics.service';
=======
import { Component, OnInit, HostListener } from '@angular/core';

>>>>>>> 1b0a56b051e214eee49fb3a605c2b46d7b3d683e
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
