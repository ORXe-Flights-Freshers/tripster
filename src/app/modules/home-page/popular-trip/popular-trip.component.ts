import { Component, OnInit, Input } from '@angular/core';
import { PopularTripService } from '@services/popular-trip.service';
import { PopularTrip } from '@models/PopularTrip';


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
  imageUrl = 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

  constructor(private popularTripService: PopularTripService) { }
  @Input() popularTrip: PopularTrip;

  ngOnInit() {

    this.source = this.popularTrip.source.name;
    this.destination = this.popularTrip.destination.name;
  }

  onClick() {
    this.popularTripService.setPopularTrip(this.popularTrip);
  }

}
