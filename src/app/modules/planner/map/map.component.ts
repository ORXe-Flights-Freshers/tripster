import { Component, OnInit } from "@angular/core";
import { TripService } from "src/app/services/trip.service";
import { Trip } from "src/app/models/Trip";
import { take } from "rxjs/operators";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  isLoading: boolean;

  constructor(public tripService: TripService) {
    // console.log(this.tripService.trip);
    this.isLoading = true;
  }
  origin;
  destination;

  markerOptions = {
    // origin:{
    //   icon: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png',
    // },
    // destination:{
    //   icon: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png',
    // },
    // waypoints:this.waypointsicon,
  };

  ngOnInit() {
    this.tripService.tripSubject.pipe(take(1)).subscribe((trip: Trip) => {
      // this.tripService.updateWaypoints();
      this.origin = {
        lat: this.tripService.trip.source.location.latitude,
        lng: this.tripService.trip.source.location.longitude
      };
      this.destination = {
        lat: this.tripService.trip.destination.location.latitude,
        lng: this.tripService.trip.destination.location.longitude
      };

      this.isLoading = false;
    });
  }
}
