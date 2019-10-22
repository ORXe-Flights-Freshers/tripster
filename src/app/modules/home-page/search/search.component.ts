import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Time } from '../../../models/Time';
import { TripService } from 'src/app/services/trip.service';
import { Router } from '@angular/router';
import { Trip } from 'src/app/models/Trip';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  origin: google.maps.places.PlaceResult;
  destination: google.maps.places.PlaceResult;
  tripDate: Date;
  tripTime: string;
  vehicleMileage: number;

  searchForm = new FormGroup({
    mileage: new FormControl()
  });
  constructor(private tripService: TripService, private router: Router) {}

  ngOnInit() {}

  handleSourceChange(place: google.maps.places.PlaceResult) {
    this.origin = place;
    console.log(place);
  }
  handleDestinationChange(place: google.maps.places.PlaceResult) {
    this.destination = place;
  }
  handleTimeSet(time: string) {
    this.tripTime = time;
  }
  handleDateSet(date) {
    this.tripDate = new Date(date.value);
  }
  getMinDate() {
    return new Date(Date.now());
  }
  onSubmit() {
    const time = Time.parseTimeStringToTime(this.tripTime);
    this.tripDate.setHours(time.hours);
    this.tripDate.setMinutes(time.minutes);

    const trip = new Trip();
    trip.source.location.latitude = this.origin.geometry.location.lat();
    trip.source.location.latitude = this.origin.geometry.location.lng();

    trip.destination.location.latitude = this.destination.geometry.location.lat();
    trip.destination.location.latitude = this.destination.geometry.location.lng();

    trip.mileage = this.vehicleMileage;

    this.tripService.createTrip(trip);

    this.router.navigate(['/', 'planner']);
    // console.log(this.tripDate);
    // console.log(trip);
  }
}
