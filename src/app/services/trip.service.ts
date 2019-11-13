import {Injectable} from '@angular/core';
import { Trip } from '../models/Trip';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Stop } from '../models/Stop';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../models/Place';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  trip: Trip;
  // tripSubject = new Subject<Trip>();
  waypoints = [];
  waypointsInfo = [];
  placeMarker;
  mapZoom=9;
  // waypointLocation:location{lat:number,lng:number}[];

  directionResult: google.maps.DirectionsResult;

  displayTimeline = false;
  timelinePauseTime = 100;

  constructor(private http: HttpClient,
              private route: Router,
  ) {}

  createTrip(trip: Trip) {
    this.trip = trip;
    this.displayTimeline = true;

    // this.tripSubject.next(trip);
    // console.log("trip.service", trip);
    this.updateTimeline();
    return this.http.post('http://3.14.69.62:5001/api/trip', trip);
  }
  getTrip(tripId) {
    console.log(tripId);
    this.displayTimeline = false;
    this.http.get('http://3.14.69.62:5001/api/trip/' + tripId).subscribe(
      data => {
        this.trip = data as Trip;
        this.updateWaypoints();
        this.updateTimeline();
        // this.tripSubject.next(this.trip);
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
    this.displayTimeline = false;

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

      previousDeparture.setSeconds(
        previousDeparture.getSeconds() +
        directionResult.routes[0].legs[
        directionResult.routes[0].legs.length - 1
          ].duration.value
      );
      this.trip.destination.arrival = previousDeparture.toString();
      this.trip.destination.departure = previousDeparture.toString();
      this.updateTimeline();
      this.updateTrip(this.trip).subscribe();
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
    // this.tripSubject.next(this.trip);
    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe();

    this.updateTimeline();
    return 'success';
   }

  addHotelToTrip(hotelData, stopIdOfHotel) {

    this.displayTimeline = false;

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

    this.updateTimeline();
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

     // this.tripSubject.next(this.trip);

     this.updateTimeline();
     this.updateWaypoints();
     this.updateTrip(this.trip).subscribe(response => {});
  }


  updateWaypoints() {
    const allStops = this.trip.stops;
    const waypointsLocations = [];
    const waypointsInfo = [];

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
          waypointsInfo.push({name: stop.name});
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
          waypointsInfo.push({name: place.name});
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
      waypointsInfo.push({name: place.name});
    }

    this.waypoints = waypointsLocations;
    this.waypointsInfo = waypointsInfo;
  }

  getPlacesInOrder(stop: Stop) {
   // Returns array of places containing hotels and attractions in order of arrival time
   // Assuming hotels and attraction are in order of arrival in their array
  //  let hotelIndex = 0;
  //  let attractionIndex = 0;
  //  const places = [];
  //
  //  const totalPlaces = stop.hotels.length + stop.attractions.length  ;
  //
  //  for (let counter = 0; counter < totalPlaces; counter++) {
  //
  //   if (hotelIndex >= stop.hotels.length && attractionIndex >= stop.attractions.length ) {
  //     const minPlace = this.getSmallerArrivalTime(stop.hotels[hotelIndex], stop.attractions[attractionIndex]);
  //     if ( minPlace === 'hotel') {
  //          places.push(stop.hotels[hotelIndex]);
  //          hotelIndex++;
  //     } else {
  //      places.push(stop.attractions[attractionIndex]);
  //      attractionIndex++;
  //     }
  //   } else {
  //      while (hotelIndex < stop.hotels.length) {
  //       places.push(stop.hotels[hotelIndex]);
  //       hotelIndex++;
  //      }
  //      while (attractionIndex < stop.attractions.length) {
  //       places.push(stop.attractions[attractionIndex]);
  //       attractionIndex++;
  //      }
  //      break;
  //   }
  // }
  //
  //  return places;
    return [...stop.hotels, ...stop.attractions]
      .sort((place1: Place, place2: Place) => {
        return new Date(place1.arrival) < new Date(place2.arrival) ? -1 : 1;
      });
  }


  // getSmallerArrivalTime(hotel, attraction) {
  //   if (hotel.arrival < attraction.arrival) {
  //     return 'hotel';
  //   } else {
  //     return 'attraction';
  //   }
  // }


  getStopByStopId(stopId): Stop {
    const { source, destination } = this.trip;
    for (const stop of [source, destination, ...this.trip.stops]) {
      if (stopId === stop.stopId) {
        return stop;
      }
    }
    return null;
  }

  showPlaceMarker(place: Place) {
    this.mapZoomIn();
    setTimeout(() => {
      this.placeMarker = place;
    }, 100);
  }
  mapZoomIn() {
    const interValZoom = setInterval(() => {
      if (this.mapZoom <= 15) {
        this.mapZoom = this.mapZoom + 1 ;           
          }
          else
          {
            clearInterval(interValZoom);
          }
      
  }, 10);
  }

  hidePlaceMarker() {
    this.placeMarker = undefined;
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

    this.updateTimeline();
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

    this.updateTimeline();
    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe();
  }

  updateTimeline(): void {
    setTimeout(() => {
      this.displayTimeline = true;
    }, this.timelinePauseTime);
  }

  getRandomUrl(): string {
    return 'assets/images/hotel.jpg';
  }
}
