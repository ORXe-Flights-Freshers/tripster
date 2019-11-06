import { Injectable } from "@angular/core";
import { Trip } from "../models/Trip";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
// import { Stop } from '../models/Stop';

@Injectable({
  providedIn: "root"
})
export class TripService {
  trip: Trip;
  tripSubject = new Subject<Trip>();
  waypoints = [];
  // waypointLocation:location{lat:number,lng:number}[];
  directionResult: google.maps.DirectionsResult;

  doDisplayHotels = false;
  doDisplayAttractions = false;
  constructor(private http: HttpClient) {}

  createTrip(trip: Trip) {
    this.trip = trip;
    this.tripSubject.next(trip);
    // console.log("trip.service", trip);
    return this.http.post("http://3.14.69.62:5000/api/trip", trip);
  }

  updateTrip(trip: Trip) {
    this.trip = trip;
    this.tripSubject.next(trip);
    console.log(trip);
   var httpResponse=this.http.put('http://3.14.69.62:5000/api/trip/'+ trip.id, this.trip);
   // console.log('http://3.14.69.62:5000/api/trip/'+this.trip.id);
    return httpResponse;
  }

  handleDirectionResponse(directionResult: google.maps.DirectionsResult) {
    if (directionResult.routes[0].legs[0]) {
      const destinationArrival = new Date(this.trip.destination.arrival);
      const sourceDeparture = new Date(this.trip.source.departure);
      //console.log(destinationArrival);
      destinationArrival.setSeconds(
        sourceDeparture.getSeconds() +
          directionResult.routes[0].legs[0].duration.value
      );
      this.trip.destination.arrival = destinationArrival.toString();

      console.log(this.trip.destination.arrival);
    }
  }

  getPreviousLocation() {
    if (this.trip.stops.length !== 0) {
      const totalStops = this.trip.stops.length;
      return this.trip.stops[totalStops - 1];
    } else {
      return this.trip.source;
    }
  }

  addStopToTrip(stop) {
    stop.stopId= this.trip.stops.length -1;
        this.trip.stops.push(stop);
        this.tripSubject.next(this.trip);
        console.log(this.trip.stops);
        this.updateWaypoints();
        this.updateTrip(this.trip).subscribe(response => {
          //console.log(response);
        })
     }

  removeStopFromTrip(i: number) {
    console.log(this.trip.stops);
    this.trip.stops.splice(i, 1);
    this.tripSubject.next(this.trip);
    // console.log(this.trip.stops);
    // console.log(this.waypoints);
    this.updateWaypoints();
    // console.log(this.waypoints);
    // console.log(this.trip);

    this.updateTrip(this.trip).subscribe(response => {
      console.log(response);
    });

    //this.updateWaypoints();
    console.log(this.waypoints);
    console.log(this.trip);
  }
  updateWaypoints() {
    if (this.trip.stops.length != 0) {
      const allStops = this.trip.stops;
      const waypointsLocations = [];
      for (let index = 0; index < this.trip.stops.length; index++) {
        waypointsLocations.push({
          location: {
            lat: allStops[index].location.latitude,
            lng: allStops[index].location.longitude
          }
        });
      }

      this.waypoints = waypointsLocations;
      console.log(this.waypoints);
    }
    else
    {this.waypoints = [];}
  }
}
