import { Injectable } from "@angular/core";
import { Trip } from "../models/Trip";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TripService {
  trip: Trip;
  waypoints = [];

  constructor(private http: HttpClient) {}
  createTrip(trip: Trip) {
    this.trip = trip;
    //console.log("trip.service", trip);
    return this.http.post("http://172.16.5.149:5000/api/trip", trip);
  }
}
