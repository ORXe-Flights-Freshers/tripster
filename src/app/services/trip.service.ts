import { Injectable } from '@angular/core';
import { Trip } from '../models/Trip';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

// import { Stop } from '../models/Stop';

@Injectable({
  providedIn: 'root'
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
    return this.http.post('http://3.14.69.62:5001/api/trip', trip);
  }

  updateTrip(trip: Trip) {
    this.trip = trip;
    this.tripSubject.next(trip);
    // console.log(trip);
    return this.http.put('http://3.14.69.62:5001/api/trip/' + trip.id, this.trip);
  }

  handleDirectionResponse(directionResult: google.maps.DirectionsResult) {
    if (directionResult.routes[0].legs[0]) {
      // tslint:disable-next-line:no-shadowed-variable
      let previousDeparture;
      // console.log(directionResult);
      // console.log(this.trip.stops);
      if (this.trip.stops.length === 0) {
        previousDeparture = new Date(this.trip.source.departure);
      } else {
        previousDeparture = new Date(
          this.trip.stops[this.trip.stops.length - 1].departure
        );
      }

      // console.log(previousDeparture);
      previousDeparture.setSeconds(
        previousDeparture.getSeconds() +
          directionResult.routes[0].legs[
            directionResult.routes[0].legs.length - 1
          ].duration.value
      );
      this.trip.destination.arrival = previousDeparture.toString();
      // console.log(this.trip.destination.arrival);
    }
    // if (directionResult.routes[0].legs[0]) {
    const previousLocation = this.getPreviousLocation();
    const previousDeparture = new Date(previousLocation.departure);
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
        this.updateTrip(this.trip).subscribe(response => { });
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
}
