import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Time } from "../../../models/Time";
import { TripService } from "src/app/services/trip.service";
import { Router } from "@angular/router";
import { Trip } from "src/app/models/Trip";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  origin: google.maps.places.PlaceResult;
  destination: google.maps.places.PlaceResult;
  tripDate: Date = new Date(Date.now());
  tripTime: string = "11:00 am";
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
    let time = Time.parseTimeStringToTime(this.tripTime);
    this.tripDate.setHours(time.hours);
    this.tripDate.setMinutes(time.minutes);

    let trip = this.generateTrip();

    console.log(trip);
    this.tripService.createTrip(trip).subscribe(data => {
      this.tripService.trip = data as Trip;
      //this.router.navigate(["/", "planner"]);
      console.log(data);
      console.log(new Date(this.tripService.trip.destination.arrival));
    });

    //console.log(this.tripDate);
    // console.log(trip);
  }

  generateTrip(): Trip {
    let trip: Trip;
    trip = {
      source: {
        location: {
          latitude: this.origin.geometry.location.lat(),
          longitude: this.origin.geometry.location.lng()
        },
        stopId: this.origin.id,
        name: this.origin.name,
        arrival: this.tripDate.toString(),
        departure: this.tripDate.toString(),
        places: []
      },
      destination: {
        location: {
          latitude: this.destination.geometry.location.lat(),
          longitude: this.destination.geometry.location.lng()
        },
        stopId: this.destination.id,
        name: this.destination.name,
        arrival: this.tripDate.toString(),
        departure: this.tripDate.toString(),
        places: []
      },
      stops: [],
      mileage: this.vehicleMileage
    };
    return trip;
  }
}
