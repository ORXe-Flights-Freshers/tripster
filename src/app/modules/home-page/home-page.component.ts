import {Component, OnInit} from '@angular/core';
import {HeaderDataService} from '../../services/HeaderData/header-data.service';
import { TripService } from '@services/trip.service';
import { PopularTrip } from '@models/PopularTrip';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
   popularTrips: PopularTrip[];

  constructor(private headerDataService: HeaderDataService,
              private tripService: TripService) {
    this.headerDataService.customizeHeaderForHomePage();
  }

  ngOnInit() {
    this.getPopularTrips();
  }

  getPopularTrips() {
    this.tripService.getPopularTrips(4).subscribe((data: PopularTrip[]) => {
     this.popularTrips = data;
   });
  }

}
