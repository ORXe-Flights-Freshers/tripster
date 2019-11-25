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
   popularTrip: PopularTrip;
   source: string;
   popularTripOrigin: google.maps.places.PlaceResult;
  constructor(private headerDataService: HeaderDataService,
              private tripService: TripService) {
    this.headerDataService.customizeHeaderForHomePage();
  }

  ngOnInit() {
  }

  getPopularTrips() {
    this.tripService.getPopularTrips(5).subscribe((data: PopularTrip[]) => {
     this.popularTrips = data;
     console.log(this.popularTrips);
   });

  }

  setPopularTripToTrip(trip: PopularTrip) {

    this.popularTrip = trip;
    this.source = trip.source.name;

  }

}
