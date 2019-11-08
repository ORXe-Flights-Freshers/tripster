import { Injectable } from "@angular/core";
import { Trip } from "../models/Trip";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Stop } from "../models/Stop";
import { ActivatedRoute, Router } from "@angular/router";

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
  constructor(private http: HttpClient, private route: Router) {}

  createTrip(trip: Trip) {
    this.trip = trip;
    this.tripSubject.next(trip);
    // console.log("trip.service", trip);
    return this.http.post("http://3.14.69.62:5001/api/trip", trip);
  }
  getTrip(tripId: Trip) {
    this.http.get("http://3.14.69.62:5001/api/trip/" + tripId).subscribe(
      data => {
        this.trip = data as Trip;
        this.updateWaypoints();
        this.tripSubject.next(this.trip);
      },
      error => {
        this.route.navigate(["/", "not-found"]);
      }
    );
  }
  calculateTotalDistance() {
    let totalDistance = 0;
    console.log(this.directionResult);
    if (
      this.directionResult ? this.directionResult.routes.length !== 0 : false
    ) {
      this.directionResult.routes[0].legs.forEach(leg => {
        totalDistance += leg.distance.value;
      });
    }
    console.log(totalDistance);
    return totalDistance / 1000;
  }

  updateTrip(trip: Trip) {
    this.trip = trip;
    this.tripSubject.next(trip);
    // console.log(trip);
    return this.http.put(
      "http://3.14.69.62:5001/api/trip/" + trip.id,
      this.trip
    );
  }

  handleDirectionResponse(directionResult: google.maps.DirectionsResult) {
    if (this.trip.stops.length != 0) {
      this.trip.stops.forEach((stop, index) => {
        if (index == 0) {
          let previousDeparture = new Date(this.trip.source.departure);
          previousDeparture.setSeconds(
            previousDeparture.getSeconds() +
              directionResult.routes[0].legs[index].duration.value
          );
          this.trip.stops[index].arrival = previousDeparture.toString();
        } else {
          let previousDeparture = new Date(
            this.trip.stops[index - 1].departure
          );
          previousDeparture.setSeconds(
            previousDeparture.getSeconds() +
              directionResult.routes[0].legs[index].duration.value
          );
          this.trip.stops[index].arrival = previousDeparture.toString();
        }
      });
    }
    // if (directionResult.routes[0].legs[0]) {
    let previousLocation = this.getPreviousLocation();
    let previousDeparture = new Date(previousLocation.departure);
    console.log(directionResult);
    console.log(this.trip.stops);

    previousDeparture.setSeconds(
      previousDeparture.getSeconds() +
        directionResult.routes[0].legs[
          directionResult.routes[0].legs.length - 1
        ].duration.value
    );
    this.trip.destination.arrival = previousDeparture.toString();
    console.log(this.trip.destination.arrival);
    // }
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
    this.trip.stops.push(stop);
    this.tripSubject.next(this.trip);
    // console.log(this.trip.stops);
    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe(response => {});
  }

  removeStopFromTrip(i: number) {
    // console.log(this.trip.stops);
    this.trip.stops.splice(i, 1);
    this.tripSubject.next(this.trip);
    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe(response => {
      console.log(response);
    });
  }

  addHotelToTrip(hotelData, stopIdOfHotel) {
    if (stopIdOfHotel === this.trip.source.stopId) {
      this.trip.source.hotels.push(hotelData);
    } else if (stopIdOfHotel === this.trip.destination.stopId) {
      this.trip.destination.hotels.push(hotelData);
    } else {
      for (const stop of this.trip.stops) {
        if (stopIdOfHotel === stop.stopId) {
          stop.hotels.push(hotelData);
          break;
        }
      }
    }
  }

  updateWaypoints() {
    if (this.trip.stops.length !== 0) {
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
    } else {
      this.waypoints = [];
    }
  }
  getStopByStopId(stopId): Stop {
    if (stopId === this.trip.source.stopId) {
      return this.trip.source;
    } else if (stopId === this.trip.destination.stopId) {
      return this.trip.destination;
    } else {
      for (let index = 0; index < this.trip.stops.length; index++) {
        if (stopId === this.trip.stops[index].stopId) {
          return this.trip.stops[index];
        }
      }
    }
  }
}
