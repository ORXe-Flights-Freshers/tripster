import { Injectable } from "@angular/core";
import { Trip } from "../models/Trip";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TripService {
  trip: Trip;
  waypoints: google.maps.DirectionsWaypoint[];

  directionResult: google.maps.DirectionsResult;
  doDisplayHotels = false;
  constructor(private http: HttpClient) {}
  createTrip(trip: Trip) {
    this.trip = trip;
    // console.log("trip.service", trip);
    return this.http.post("http://3.14.69.62:5000/api/trip", trip);
  }
  handleDirectionResponse(directionResult: google.maps.DirectionsResult) {
    if (directionResult.routes[0].legs[0]) {
      const destinationArrival = new Date(this.trip.destination.arrival);
      console.log(destinationArrival);
      destinationArrival.setSeconds(
        destinationArrival.getSeconds() +
          directionResult.routes[0].legs[0].duration.value
      );
      this.trip.destination.arrival = destinationArrival.toDateString();

      console.log(this.trip.destination.arrival);
    }
  }
}
