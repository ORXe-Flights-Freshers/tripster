import { Component, OnInit } from "@angular/core";
import { TripService } from "src/app/services/trip.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  constructor(public tripService: TripService) {
    console.log(this.tripService.trip);
  }

  ngOnInit() {}
}
