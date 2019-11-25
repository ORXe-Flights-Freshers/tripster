import { Component, OnInit, Input } from '@angular/core';
import { PopularTripService } from '@services/popular-trip.service';


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

  constructor(private popularTrip: PopularTripService) { }

  ngOnInit() {
  }

}
