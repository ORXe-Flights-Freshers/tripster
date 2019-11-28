import { Injectable } from '@angular/core';
import {Trip} from '@models/Trip';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Stop} from '@models/Stop';
import { Router, ActivatedRoute } from '@angular/router';
import {Place} from '@models/Place';
import {Subject} from 'rxjs';
import {LoggerService} from '@services/logger.service';
import { Attraction } from '@models/Attraction';
import { Hotel } from '@models/Hotel';
import { environment } from '@environments/environment';
import { LoginService } from './login.service';
import { Time } from '@models/Time';
import { MapsAPILoader } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  trip: Trip;
  waypoints = [];
  waypointsInfo = [];
  placeMarker;
  mapZoom = 9;

  // durationSubject = new Subject<string[]>();
  stopSubject = new Subject<Stop>();

  directionResult: google.maps.DirectionsResult;
  directionService: google.maps.DirectionsService;
  map: google.maps.Map;

  constructor(
    private http: HttpClient,
    private route: Router,
    private loggerService: LoggerService,
    private loginService: LoginService,
    private mapsAPILoader: MapsAPILoader
  ) {
    this.mapsAPILoader.load().then(() => {
      this.directionService = new google.maps.DirectionsService();
    });
  }

  getFuelPrice() {
    const city = this.trip.source.name;
    return this.http.get(
      environment.baseUrl + ':' + environment.port + '/api/fuelprice/' + city
    );
  }

  createTrip(trip: Trip) {
    this.trip = trip;
    return this.http.post(
      environment.baseUrl + ':' + environment.port + '/api/trip',
      trip
    );
  }

  getPopularTrips(limit: number) {
    return this.http.get(
      environment.baseUrl + ':' + environment.port + '/api/populartrip/' + limit
    );
  }

  getTrip(tripId: string) {
    this.http
      .get(environment.baseUrl + ':' + environment.port + '/api/trip/' + tripId)
      .subscribe(
        (trip: Trip) => {
          this.trip = trip;
          this.setCanModifyTrip();
          this.updateWaypoints();
          this.updateTimelineTime();
        },
        (error: HttpErrorResponse) => {
          this.loggerService.error(error);
          this.route.navigate(['/', 'not-found']).then();
        }
      );
  }

  setCanModifyTrip() {
    if (this.trip && this.trip.userId) {
      if (this.loginService.loggedIn && this.loginService.user.userId === this.trip.userId) {
        this.loginService.canModifyTrip = true;
      } else {
        this.loginService.canModifyTrip = false;
      }
    } else {
      this.loginService.canModifyTrip = true;
    }
  }

  calculateTotalDistance(): number {
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
    return this.http.put(
      environment.baseUrl + ':' + environment.port + '/api/trip/' + trip.id,
      this.trip, {
        headers: { Authorization: 'Bearer-' + this.loginService.idToken }
    });
  }

  handleDirectionResponse(directionResult: google.maps.DirectionsResult) {
    // this.getDirectionResult();
    this.directionResult = directionResult;
  }

  updateTimelineTime() {
    const request: google.maps.DirectionsRequest = {
      origin: {
        lat: this.trip.source.location.latitude,
        lng: this.trip.source.location.longitude
      },
      destination: {
        lat: this.trip.destination.location.latitude,
        lng: this.trip.destination.location.longitude
      },
      optimizeWaypoints: false,
      waypoints: this.getWaypointsTimeline(),
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionService.route(request, result => {
      if (this.trip.stops.length !== 0) {
        this.trip.stops.forEach((stop, index) => {
          let previousLocation;
          if (index === 0) {
            previousLocation = this.trip.source;
          } else {
            previousLocation = this.trip.stops[index - 1];
          }
          const previousDeparture = new Date(previousLocation.departure);
          previousDeparture.setSeconds(
            previousDeparture.getSeconds() +
              result.routes[0].legs[index].duration.value
          );
          this.trip.stops[index].arrival = previousDeparture.toString();
          this.stopSubject.next(stop);
        });
      }

      {
        const previousLocation = this.getPreviousLocationOfDestination();
        const previousDeparture = new Date(previousLocation.departure);
        previousDeparture.setSeconds(
          previousDeparture.getSeconds() +
            result.routes[0].legs[result.routes[0].legs.length - 1].duration
              .value
        );
        const newArrivalTime = new Date(previousDeparture).getTime();
        const oldArrivalTime = new Date(
          this.trip.destination.arrival
        ).getTime();
        if (newArrivalTime !== oldArrivalTime) {
          this.addTimeToDestinationItineraries(newArrivalTime - oldArrivalTime);
        }
        this.trip.destination.arrival = previousDeparture.toString();
        this.stopSubject.next(this.trip.destination);
        this.updateTrip(this.trip).subscribe();
      }
    });
  }

  getPreviousLocationOfDestination(): Stop {
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
    this.updateTimelineTime();
    this.updateTrip(this.trip).subscribe();
    return 'success';
  }

  addHotelToTrip(hotelData: Hotel, stopIdOfHotel) {
    for (const stop of [...this.trip.stops, this.trip.destination]) {
      if (stopIdOfHotel === stop.stopId) {
        stop.hotels.push(hotelData);
        this.stopSubject.next(stop);
        const stopTime = new Date(stop.departure).getTime();
        const hotelTime = new Date(hotelData.departure).getTime();
        if (stopTime < hotelTime) {
          this.addTimeToTrip(hotelTime - stopTime, stop.stopId);
        }
        this.stopSubject.next(stop);
        break;
      }
    }
    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe();
  }

  addAttractionToTrip(attractionData: Attraction, stopIdOfAttraction) {
    if (stopIdOfAttraction === this.trip.destination.stopId) {
      this.trip.destination.attractions.push(attractionData);
      this.stopSubject.next(this.trip.destination);
    } else {
      for (const stop of this.trip.stops) {
        if (stopIdOfAttraction === stop.stopId) {
          if (stop.attractions.length === 0) {
            stop.attractions.push(attractionData);
          } else {
            let index = 0;
            while (
              index < stop.attractions.length &&
              stop.attractions[index].arrival > attractionData.arrival
            ) {
              index++;
            }
            stop.attractions.splice(index, 0, attractionData);
          }
          const stopTime = new Date(stop.departure).getTime();
          const attractionTime = new Date(attractionData.departure).getTime();
          if (stopTime < attractionTime) {
            this.addTimeToTrip(attractionTime - stopTime, stop.stopId);
          }
          this.stopSubject.next(stop);
          break;
        }
      }
    }

    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe();
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
          name: stop.name,
          placeId: stop.stopId
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
          waypointsInfo.push({ name: place.name, placeId: place.placeId });
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
      waypointsInfo.push({ name: place.name, placeId: place.placeId });
    }
    this.waypoints = waypointsLocations;
    this.waypointsInfo = waypointsInfo;
  }

  getPlacesInOrder(stop: Stop) {
    // Returns array of places containing hotels and attractions in order of arrival time
    // Assuming hotels and attraction are in order of arrival in their array
    return [...stop.hotels, ...stop.attractions].sort(
      (place1: Place, place2: Place) => {
        return new Date(place1.arrival) < new Date(place2.arrival) ? -1 : 1;
      }
    );
  }

  getWaypointsTimeline() {
    const waypointsLocations = [];
    for (const stop of this.trip.stops) {
      const { latitude, longitude } = stop.location;
      waypointsLocations.push({
        location: {
          lat: latitude,
          lng: longitude
        }
      });
    }
    return waypointsLocations;
  }

  addTimeToTrip(timeToAdd, changeStopId) {
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

  getTimeBetweenStops(): string[] {
    if (!this.trip) {
      return [];
    }

    const timeBetweenStops: string[] = [];
    let timeToCalculate: number;
    if (this.trip.stops.length > 0) {
      // timeToCalculate = new Date(this.trip.stops[0].arrival) - new Date(this.trip.source.departure);
      timeToCalculate =
        Date.parse(this.trip.stops[0].arrival) -
        Date.parse(this.trip.source.departure);

      timeBetweenStops.push(Time.convertMiliSecondsToDays(timeToCalculate));

      for (let index = 1; index < this.trip.stops.length; ++index) {
        timeToCalculate =
          Date.parse(this.trip.stops[index].arrival) -
          Date.parse(this.trip.stops[index - 1].departure);
        timeBetweenStops.push(Time.convertMiliSecondsToDays(timeToCalculate));
      }

      timeToCalculate =
        Date.parse(this.trip.destination.arrival) -
        Date.parse(this.trip.stops[this.trip.stops.length - 1].departure);
      timeBetweenStops.push(Time.convertMiliSecondsToDays(timeToCalculate));
    } else {
      timeToCalculate =
        Date.parse(this.trip.destination.arrival) -
        Date.parse(this.trip.source.departure);
      timeBetweenStops.push(Time.convertMiliSecondsToDays(timeToCalculate));
    }
    return timeBetweenStops;
  }

  addTimeToDestinationItineraries(timeToAdd: number) {
    for (const place of [
      ...this.trip.destination.attractions,
      ...this.trip.destination.hotels
    ]) {
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
    // this.route.navigate(
    //   ['/planner', this.trip.id], {
    //     fragment: 'google-map-fragment'
    //   }
    // );
    window.location.hash = '';
    window.location.hash = 'google-map-fragment';
    this.mapZoomIn();
    this.placeMarker = place;
    this.map.panTo({
      lat: place.location.latitude,
      lng: place.location.longitude
    });
  }

  mapZoomIn() {
    const interValZoom = setInterval(() => {
      if (this.mapZoom > 15) {
        clearInterval(interValZoom);
        return;
      }
      this.mapZoom = this.mapZoom + 1;
    }, 100);
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

  removeStopFromTrip(stopIncoming: Stop): string {
    const stops = [];

    this.trip.stops.forEach((stop: Stop) => {
      if (
        !(
          stop.stopId === stopIncoming.stopId &&
          stop.arrival === stopIncoming.arrival &&
          stop.departure === stopIncoming.departure
        )
      ) {
        stops.push(stop);
      }
    });

    this.trip.stops = stops;

    this.updateWaypoints();
    this.updateTimelineTime();
    this.updateTrip(this.trip).subscribe();
    return 'success';
  }

  editSourceOrDestination(stop: Stop, sourceOrDestination: string) {
    console.log(`Edited ${sourceOrDestination}...`);
  }

  deletePlaceFromStop(stop: Stop, place, placeType: string) {
    if (placeType === 'hotel') {
      stop.hotels = stop.hotels.filter(hotel => {
        return !(
          hotel.placeId === place.id &&
          hotel.arrival === place.arrivalTime.toString() &&
          hotel.departure === place.departureTime.toString()
        );
      });
    } else if (placeType === 'attraction') {
      stop.attractions = stop.attractions.filter(attraction => {
        return !(
          attraction.placeId === place.id &&
          attraction.arrival === place.arrivalTime.toString() &&
          attraction.departure === place.departureTime.toString()
        );
      });
    }

    this.stopSubject.next(stop);
    this.updateWaypoints();
    this.updateTrip(this.trip).subscribe();
  }
}
