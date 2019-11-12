import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { HttpClient } from '@angular/common/http';
import { HeaderDataService } from '../../../services/HeaderData/header-data.service';
import {NavigatorService} from '../../../services/navigator.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

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
    // @ts-ignore
    const tripId = this.route.params.value.id;
    this.tripService.getTrip(tripId);
  }
}
