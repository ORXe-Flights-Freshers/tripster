import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateTime } from "luxon";

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
    console.log(this.searchForm.value);
  }
}
