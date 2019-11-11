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
  // waypointLocation:location{lat:number,lng:number}[];
  directionResult: google.maps.DirectionsResult;

  doDisplayHotels = false;
  doDisplayAttractions = false;
  constructor(private http: HttpClient, private route: Router) {}

  createTrip(trip: Trip) {
    this.trip = trip;
    this.tripSubject.next(trip);
    // console.log("trip.service", trip);
    return this.http.post('http://3.14.69.62:5001/api/trip', trip);
  }
  getTrip(tripId: Trip) {
    this.http.get('http://3.14.69.62:5001/api/trip/' + tripId).subscribe(
      data => {
        this.trip = data as Trip;
        this.updateWaypoints();
        this.tripSubject.next(this.trip);
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
      this.trip.destination.departure = previousDeparture.toString();
      this.updateTrip(this.trip).subscribe(response => {
        // console.log(response);
        });
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
        this.trip.stops.push(stop);
        // this.tripSubject.next(this.trip);
        // console.log(this.trip.stops);
        this.updateWaypoints();
        this.updateTrip(this.trip).subscribe(response => {
        //   console.log(response);
         });
        return 'success';
     }

  removeStopFromTrip(i: number): string {
    // console.log(this.trip.stops);
    this.trip.stops.splice(i, 1);
    // this.tripSubject.next(this.trip);
    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe(response => {
    // console.log(response);
    });
    return 'success';
  }

  addHotelToTrip(hotelData, stopIdOfHotel) {
   if (stopIdOfHotel === this.trip.destination.stopId) {
      this.trip.destination.hotels.push(hotelData);
    } else {
      for (const stop of this.trip.stops) {
        if (stopIdOfHotel === stop.stopId) {
          stop.hotels.push(hotelData);
          break;
        }
      }
    }
   this.updateWaypoints();
   this.updateTrip(this.trip).subscribe(response => {});
  }

  addAttractionToTrip(attractionData, stopIdOfAttraction) {
     if (stopIdOfAttraction === this.trip.destination.stopId) {
      this.trip.destination.attractions.push(attractionData);
    } else {
      for (const stop of this.trip.stops) {
        if (stopIdOfAttraction === stop.stopId) {
          if (stop.attractions.length === 0) {
             stop.attractions.push(attractionData);
          } else {
            let index = 0;
            while (index < stop.attractions.length && stop.attractions[index].arrival > attractionData.arrival) {
             index++;
            }
            stop.attractions.splice(index, 0, attractionData);
          }

          break;
        }
      }
    }
     console.log(this.trip);
     this.updateWaypoints();
     this.updateTrip(this.trip).subscribe(response => {});
  }


  updateWaypoints() {
    const allStops = this.trip.stops;
    const waypointsLocations = [];

    // for (const hotel of this.trip.source.hotels) {
    //   waypointsLocations.push({
    //     location: {
    //       lat: hotel.location.latitude,
    //       lng: hotel.location.longitude
    //     }
    //   });
    // }
    for (const stop of this.trip.stops) {
      if (stop.hotels.length === 0 && stop.attractions.length === 0) {
          waypointsLocations.push({
          location: {
            lat: stop.location.latitude,
            lng: stop.location.longitude
          }
        });
      } else {
        let placesArray = [];
        placesArray = this.getPlacesInOrder(stop);
        for (const place of placesArray) {
          waypointsLocations.push({
            location: {
              lat: place.location.latitude,
              lng: place.location.longitude
            }
          });
        }
     }
    }

    const places = this.getPlacesInOrder(this.trip.destination);
    for (const place of places) {
      waypointsLocations.push({
        location: {
          lat: place.location.latitude,
          lng: place.location.longitude
        }
      });
    }

    this.waypoints = waypointsLocations;
  }

  getPlacesInOrder(stop: Stop) {
   // Returns array of places containing hotels and attractions in order of arrival time
   // Assuming hotels and attraction are in order of arrival in their array
   let hotelIndex = 0;
   let attractionIndex = 0;
   const places = [];

   const totalPlaces = stop.hotels.length + stop.attractions.length  ;

   for (let counter = 0; counter < totalPlaces; counter++) {

    if (hotelIndex >= stop.hotels.length && attractionIndex >= stop.attractions.length ) {
      const minPlace = this.getSmallerArrivalTime(stop.hotels[hotelIndex], stop.attractions[attractionIndex]);
      if ( minPlace === 'hotel') {
           places.push(stop.hotels[hotelIndex]);
           hotelIndex++;
      } else {
       places.push(stop.attractions[attractionIndex]);
       attractionIndex++;
      }
    } else {
       while (hotelIndex < stop.hotels.length) {
        places.push(stop.hotels[hotelIndex]);
        hotelIndex++;
       }
       while (attractionIndex < stop.attractions.length) {
        places.push(stop.attractions[attractionIndex]);
        attractionIndex++;
       }
       break;
    }
  }

   return places;
  }


  getSmallerArrivalTime(hotel, attraction) {
    if (hotel.arrival < attraction.arrival) {
      return 'hotel';
    } else {
      return 'attraction';
    }
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

}
