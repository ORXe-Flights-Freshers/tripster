import { Injectable } from '@angular/core';
import { Trip } from '../models/Trip';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Stop } from '../models/Stop';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  trip: Trip;
  tripSubject = new Subject<Trip>();
  waypoints = [];
  directionResult: google.maps.DirectionsResult;

  displayTimeline = false;

  doDisplayHotels = false;
  doDisplayAttractions = false;
  constructor(private http: HttpClient, private route: Router) {}

  createTrip(trip: Trip) {
    this.trip = trip;
    this.tripSubject.next(trip);
    this.displayTimeline = true;
    return this.http.post('http://3.14.69.62:5001/api/trip', trip);
  }
  getTrip(tripId: Trip) {
    this.http.get('http://3.14.69.62:5001/api/trip/' + tripId).subscribe(
      data => {
        this.trip = data as Trip;
        this.updateWaypoints();
        this.tripSubject.next(this.trip);
        this.displayTimeline = true;
      },
      error => {
        this.route.navigate(['/', 'not-found']);
      }
    );
  }
  calculateTotalDistance() {
    let totalDistance = 0;
    if (
      this.directionResult ? this.directionResult.routes.length !== 0 : false
    ) {
      this.directionResult.routes[0].legs.forEach(leg => {
        totalDistance += leg.distance.value;
      });
    }
    return totalDistance / 1000;
  }

  updateTrip(trip: Trip) {
    this.trip = trip;
    // this.tripSubject.next(trip);
    // console.log(trip);
    return this.http.put('http://3.14.69.62:5001/api/trip/' + trip.id, this.trip);
  }

  handleDirectionResponse(directionResult: google.maps.DirectionsResult) {
    this.directionResult = directionResult;

    if (this.trip.stops.length !== 0) {
      this.trip.stops.forEach((stop, index) => {
        let previousDeparture;
        if (index === 0) {
          previousDeparture = new Date(this.trip.source.departure);
          previousDeparture.setSeconds(
            previousDeparture.getSeconds() +
              directionResult.routes[0].legs[index].duration.value
          );
          this.trip.stops[index].arrival = previousDeparture.toString();
        } else {
          previousDeparture = new Date(
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

    {
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
    }

  }

  getPreviousLocation(): Stop {
    if (this.trip.stops.length !== 0) {
      const totalStops = this.trip.stops.length;
      return this.trip.stops[totalStops - 1];
    } else {
      return this.trip.source;
    }
  }

  addStopToTrip(stop): string {
    this.displayTimeline = false;
    this.trip.stops.push(stop);
    this.tripSubject.next(this.trip);
    // console.log(this.trip.stops);
    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe();
    this.displayTimeline = true;
    return 'success';
   }

  addHotelToTrip(hotelData, stopIdOfHotel) {
    this.displayTimeline = false;

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

    this.trip = Object.assign({}, this.trip);

    this.displayTimeline = true;
    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe(response => {});
  }

  // addAttractionToTrip(attractionData,stopIdOfAttraction) {
  //   if (stopIdOfAttraction === this.trip.source.stopId) {
  //     this.trip.source.attractions.push(attractionData);
  //   } else if (stopIdOfAttraction === this.trip.destination.stopId) {
  //     this.trip.destination.attractions.push(attractionData);
  //   } else {
  //     for (const stop of this.trip.stops) {
  //       if (stopIdOfAttraction === stop.stopId) {
  //         stop.attractions.push(attractionData);
  //         break;
  //       }
  //     }
  //   }
  //   this.updateWaypoints();
  //   this.updateTrip(this.trip).subscribe(response => {});
  // }


  updateWaypoints() {
    const allStops = this.trip.stops;
    const waypointsLocations = []

    for (const hotel of this.trip.source.hotels) {
      waypointsLocations.push({
        location: {
          lat: hotel.location.latitude,
          lng: hotel.location.longitude
        }
      });
    }

    for (let index = 0; index < this.trip.stops.length; index++) {

      if (allStops[index].hotels.length === 0) {
          waypointsLocations.push({
          location: {
            lat: allStops[index].location.latitude,
            lng: allStops[index].location.longitude
          }
        });
      } else {
        for (const hotel of allStops[index].hotels) {
          waypointsLocations.push({
            location: {
              lat: hotel.location.latitude,
              lng: hotel.location.longitude
            }
          });
        }
     }
    }
    for (const hotel of this.trip.destination.hotels) {
      const {latitude, longitude} = hotel.location;
      waypointsLocations.push({
        location: { lat: latitude, lng: longitude }
      });
    }

    this.waypoints = waypointsLocations;
  }

  getStopByStopId(stopId): Stop {
    const { source, destination } = this.trip;
    for (const stop of [source, destination, ...this.trip.stops]) {
      if (stopId === stop.stopId) {
        return stop;
      }
    }
    return null;
  }

  removeStopFromTrip(stopId: string): string {
    const stops = [];
    this.displayTimeline = false;

    this.trip.stops.forEach((stop: Stop) => {
      if (stop.stopId !== stopId) {
        stops.push(stop);
      }
    });

    this.trip.stops = stops;
    this.displayTimeline = true;
    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe();
    return 'success';
  }

  editSourceOrDestination(stop: Stop, sourceOrDestination: string) {
    console.log(`Edited ${sourceOrDestination}...`);
  }

  deletePlaceFromStop(stopId: string, placeId: string, placeType: string) {
    this.displayTimeline = false;

    for (const stop of [this.trip.source, ...this.trip.stops, this.trip.destination]) {
      if (stop.stopId === stopId) {
        if (placeType === 'hotel') {
          const hotels = [];
          for (const hotel of stop.hotels) {
            if (hotel.placeId !== placeId) {
              hotels.push(hotel);
            }
          }
          stop.hotels = hotels;
        } else if (placeType === 'attraction') {
          const attractions = [];
          for (const attraction of stop.attractions) {
            if (attraction.placeId !== placeId) {
              attractions.push(attraction);
            }
          }
          stop.attractions = attractions;
        }
        break;
      }
    }

    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe();
    this.displayTimeline = true;
  }

  getRandomUrl(): string {
    return 'assets/images/hotel.jpg';
  }
}
