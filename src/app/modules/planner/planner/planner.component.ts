import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TripService} from '@services/trip.service';
import {HttpClient} from '@angular/common/http';
import {HeaderDataService} from '@services/HeaderData/header-data.service';
import {NavigatorService} from '@services/navigator.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  activeTabSubscription: Subscription;

  activeTab: string;

  constructor(
    public route: ActivatedRoute,
    public tripService: TripService,
    private http: HttpClient,
    private headerLinks: HeaderDataService,
    public navigatorService: NavigatorService
  ) {
    this.headerLinks.customizeHeaderForPlannerPage();
    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.tripService.getTrip(params.id);
      });

    this.activeTabSubscription = this.navigatorService.activeTabSubject
        .subscribe((data: string) => {
          this.activeTab = data;
        });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.activeTabSubscription.unsubscribe();
  }
}
