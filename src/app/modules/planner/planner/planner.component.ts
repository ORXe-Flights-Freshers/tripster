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

  constructor(
    public route: ActivatedRoute,
    public tripService: TripService,
    private http: HttpClient,
    private headerLinks: HeaderDataService,
    public navigatorService: NavigatorService
  ) {
    this.headerLinks.customizeHeaderForPlannerPage();
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.tripService.getTrip(params.id);
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
