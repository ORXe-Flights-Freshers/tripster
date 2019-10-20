import { Injectable } from "@angular/core";
import { Trip } from "../models/Trip";

@Injectable({
  providedIn: "root"
})
export class TripService {
  trip: Trip;
  waypoints = [];

  constructor() {
    this.trip = new Trip();
  }
  createTrip(trip: Trip) {
    this.trip = trip;
  }
}
