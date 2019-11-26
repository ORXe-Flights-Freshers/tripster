import { Component, OnInit, Input } from '@angular/core';
import { PopularTripService } from '@services/popular-trip.service';
import { PopularTrip } from '@models/PopularTrip';
import {AnalyticsService} from '@services/analytics.service';

@Component({
  selector: 'app-popular-trip',
  templateUrl: './popular-trip.component.html',
  styleUrls: ['./popular-trip.component.css']
})
export class PopularTripComponent implements OnInit {
  source = 'Mumbai';
  destination = 'Goa';

  lat: number;
  lng: number;
  imageUrl = 'https://source.unsplash.com/230x250/?nature&_tripster=' + Math.random();

  constructor(private popularTripService: PopularTripService,
              public analytics: AnalyticsService) { }
  @Input() popularTrip: PopularTrip;

  ngOnInit() {
    this.source = this.popularTrip.source.name;
    this.destination = this.popularTrip.destination.name;
  }

  onClick() {
    this.popularTripService.setPopularTrip(this.popularTrip);
    this.analytics.eventEmitter("HomePage",  this.popularTrip.source.name + ' -> ' + this.popularTrip.destination.name, "Popular Trips", 1);
  }

}
