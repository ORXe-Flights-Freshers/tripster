import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Time } from "../../../models/Time";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  origin: google.maps.places.PlaceResult;
  destination: google.maps.places.PlaceResult;
  tripDate: Date = new Date(Date.now());
  tripTime: String = "11:00 am";
  vehicleMileage: Number;

  searchForm = new FormGroup({
    mileage: new FormControl()
  });
  constructor() {}

  ngOnInit() {}

  handleSourcePlaceChange(place: google.maps.places.PlaceResult) {
    this.origin = place;
    console.log(place);
  }
  handleDestinationPlaceChange(place: google.maps.places.PlaceResult) {
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

    console.log(this.tripDate);
  }
}
