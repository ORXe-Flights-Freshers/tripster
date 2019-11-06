import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Time } from "../../../models/Time";
import { TripService } from "src/app/services/trip.service";
import { Router } from "@angular/router";
import { Trip } from "src/app/models/Trip";
import { TimePickerThemeService } from "../../../services/TimePickerTheme.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  origin: google.maps.places.PlaceResult;
  destination: google.maps.places.PlaceResult;
  sourceValid: boolean;
  destinationValid: boolean;
  tripDate: Date = new Date(Date.now());
  tripTime = "11:00 am";
  vehicleMileage = 25;

  searchForm = new FormGroup({
    mileage: new FormControl(this.vehicleMileage, [
      Validators.pattern("^[1-9]+[0-9]*$")
    ])
  });

  constructor(
    private tripService: TripService,
    private router: Router,
    public timePickerThemeService: TimePickerThemeService
  ) {}

  ngOnInit() {}

  handleInvalidSource(event) {
    this.sourceValid = event.isValid;
  }
  handleInvalidDestination(event) {
    this.destinationValid = event.isValid;
  }

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

    const trip = this.generateTrip();

    console.log(trip);
    this.tripService.createTrip(trip).subscribe(data => {
      console.log(data);
      // this.tripService.trip = data as Trip;
      // @ts-ignore
      this.router.navigate(["/", "planner", (data as Trip).id]);
      // console.log(data);
      console.log(new Date((data as Trip).destination.arrival));
    });
    // this.tripService.trip = trip;
    // this.router.navigate(["/", "planner", 123]);
    // console.log(this.tripDate);
  }

  generateTrip(): Trip {
    let trip: Trip;
    trip = {
      source: {
        location: {
          latitude: this.origin.geometry.location.lat(),
          longitude: this.origin.geometry.location.lng()
        },
        // @ts-ignore
        stopId: this.origin.place_id,
        name: this.origin.name,
        // @ts-ignore
        arrival: this.tripDate.toString(),
        // @ts-ignore
        departure: this.tripDate.toString(),
        hotels: [],
        attractions: []
      },
      destination: {
        location: {
          latitude: this.destination.geometry.location.lat(),
          longitude: this.destination.geometry.location.lng()
        },
        // @ts-ignore
        stopId: this.destination.place_id,
        name: this.destination.name,
        // @ts-ignore
        arrival: this.tripDate.toString(),
        // @ts-ignore
        departure: this.tripDate.toString(),
        hotels: [],
        attractions: []
      },
      stops: [],
      mileage: this.vehicleMileage
    };
    return trip;
  }
}
