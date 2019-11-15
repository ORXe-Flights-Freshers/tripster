import { Injectable } from '@angular/core';
import { Trip } from '@models/Trip';
import { HttpClient } from '@angular/common/http';
import { Stop } from '@models/Stop';
import { Router } from '@angular/router';
import { Place } from '@models/Place';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  trip: Trip;
  waypoints = [];
  waypointsInfo = [];
  placeMarker;
  mapZoom = 9;

  directionResult: google.maps.DirectionsResult;

  displayTimeline = false;
  timelinePauseTime = 200;

  constructor(private http: HttpClient,
              private route: Router,
  ) {}

  createTrip(trip: Trip) {
    this.trip = trip;
    return this.http.post('http://3.14.69.62:5001/api/trip', trip);
  }
  getTrip(tripId) {
    console.log(`trip-id: ${tripId}`);

    this.http.get('http://3.14.69.62:5001/api/trip/' + tripId).subscribe(
      data => {
        this.trip = data as Trip;

        this.updateWaypoints();
        this.updateTimeline();
      },
      error => {
        this.route.navigate(['/', 'not-found']);
      }
    );
  }
  calculateTotalDistance() {
    if (!this.directionResult || !this.directionResult.routes) {
      return 0;
    }
    let totalDistance = 0;
    this.directionResult.routes[0].legs.forEach(leg => {
      totalDistance += leg.distance.value;
    });
    return totalDistance / 1000;
  }

  updateTrip(trip: Trip) {
    this.trip = trip;
    return this.http.put('http://3.14.69.62:5001/api/trip/' + trip.id, this.trip);
  }

  handleDirectionResponse(directionResult: google.maps.DirectionsResult) {
    this.directionResult = directionResult;
    console.log(directionResult);
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
          0
        // directionResult.routes[0].legs.length - 1
          ].duration.value
      );
      const newArrivalTime = (new Date(previousDeparture)).getTime();
      const oldArrivalTime = (new Date( this.trip.destination.arrival)).getTime();
      if (newArrivalTime != oldArrivalTime) {
        console.log(this.trip);
        console.log(newArrivalTime - oldArrivalTime);
        this.addTimeToDestinationIteneraries(( newArrivalTime - oldArrivalTime));
        console.log(this.trip);
      }
      this.trip.destination.arrival = previousDeparture.toString();
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
    this.trip.stops.push(stop);
    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe();
    return 'success';
   }

  addHotelToTrip(hotelData, stopIdOfHotel) {
    for (const stop of [...this.trip.stops, this.trip.destination]) {
      if (stopIdOfHotel === stop.stopId) {
        stop.hotels.push(hotelData);
        const stopTime = (new Date(stop.departure)).getTime();
        const hotelTime = (new Date(hotelData.departure)).getTime();
        if (stopTime < hotelTime) {
          console.log(this.trip);
          this.addTimetoTrip(( hotelTime - stopTime), stop.stopId);
          console.log(this.trip);
        }
        break;
      }
    }

    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe(response => {});
  }

  addAttractionToTrip(attractionData, stopIdOfAttraction) {
     if (stopIdOfAttraction === this.trip.destination.stopId) {
      this.trip.destination.attractions.push(attractionData);
      console.log(attractionData);
      console.log(this.trip.destination);
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

     this.updateWaypoints();
     this.updateTrip(this.trip).subscribe(response => {});
  }


   updateWaypoints() {
    const waypointsLocations = [];
    const waypointsInfo = [];

    for (const stop of this.trip.stops) {
      if ([...stop.hotels, ...stop.attractions].length === 0) {
        const { latitude, longitude } = stop.location;
        waypointsLocations.push({
          location: {
            lat: latitude,
            lng: longitude
          }
        });
        waypointsInfo.push({
          name: stop.name
        });
      } else {
        this.getPlacesInOrder(stop).forEach((place: Place) => {
              const { latitude, longitude } = place.location;
              waypointsLocations.push({
                location: {
                  lat: latitude,
                  lng: longitude
                }
              });
              waypointsInfo.push({name: place.name});
        });
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
    this.updateTimeline();
  }

  getPlacesInOrder(stop: Stop) {
   // Returns array of places containing hotels and attractions in order of arrival time
   // Assuming hotels and attraction are in order of arrival in their array
    return [...stop.hotels, ...stop.attractions]
      .sort((place1: Place, place2: Place) => {
        return new Date(place1.arrival) < new Date(place2.arrival) ? -1 : 1;
      });
  }
  addTimetoTrip(timeToAdd, changeStopId){
    let toAdd = false;
    const firstStop = this.getStopByStopId(changeStopId);
    firstStop.departure = this.getNewTime(firstStop.departure, timeToAdd);
    for (const stop of [...this.trip.stops, this.trip.destination]) {
      if (toAdd) {
          stop.arrival = this.getNewTime(stop.arrival, timeToAdd);
          stop.departure = this.getNewTime(stop.departure, timeToAdd);
          const arrayToManipulate = [...stop.attractions, ...stop.hotels];
          this.addTimeToArray(arrayToManipulate, timeToAdd);
      }
      if (changeStopId === stop.stopId && !toAdd) {
          toAdd = true;
        }
  }
}
  addTimeToArray(arrayToManipulate, timeToAdd) {
    arrayToManipulate.forEach(element => {
      element.arrival = this.getNewTime(element.arrival, timeToAdd);
      element.departure = this.getNewTime(element.departure, timeToAdd);
    });
  }
  getNewTime(oldTime, timeToAdd): string {
    const timeInMilli = new Date(oldTime).getTime();
    return new Date(timeInMilli + timeToAdd).toString();
  }

  addTimeToDestinationIteneraries(timeToAdd: number) {
      for (const place of [...this.trip.destination.attractions, ...this.trip.destination.hotels]) {
            place.arrival = this.getNewTime(place.arrival, timeToAdd);
            place.departure = this.getNewTime(place.departure, timeToAdd);
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

  showPlaceMarker(place: Place) {
    this.mapZoomIn();
    this.placeMarker = place;
  }
  mapZoomIn() {
    const interValZoom = setInterval(() => {
      if (this.mapZoom > 15) {
        clearInterval(interValZoom);
        return;
      }
      this.mapZoom = this.mapZoom + 1 ;
    }, 10);
  }

  hidePlaceMarker() {
    this.placeMarker = undefined;
  }

  getStopIndexByStopId(stopId) {
    let index = 0;
    for (const stop of this.trip.stops) {
      if (stopId === stop.stopId) {
        return index;
      } else {
        index++;
      }
    }
  }

  removeStopFromTrip(stopId: string): string {
    const stops = [];

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
    this.displayTimeline = false;
    setTimeout(() => {
      this.displayTimeline = true;
    }, this.timelinePauseTime);
  }

  getRandomUrl(): string {
    return 'assets/images/hotel.jpg';
  }
}
