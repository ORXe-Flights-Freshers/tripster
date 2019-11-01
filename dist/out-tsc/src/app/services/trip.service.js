import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
// import { Stop } from '../models/Stop';
let TripService = class TripService {
    constructor(http) {
        this.http = http;
        this.waypoints = [];
        this.doDisplayHotels = false;
    }
    createTrip(trip) {
        this.trip = trip;
        // console.log("trip.service", trip);
        return this.http.post('http://3.14.69.62:5000/api/trip', trip);
    }
    handleDirectionResponse(directionResult) {
        if (directionResult.routes[0].legs[0]) {
            const destinationArrival = new Date(this.trip.destination.arrival);
            console.log(destinationArrival);
            destinationArrival.setSeconds(destinationArrival.getSeconds() +
                directionResult.routes[0].legs[0].duration.value);
            this.trip.destination.arrival = destinationArrival.toDateString();
            console.log(this.trip.destination.arrival);
        }
    }
    addStopToTrip(stop) {
        this.trip.stops.push(stop);
        // console.log("Updated stops array");
        // console.log(this.trip.stops);
        this.updateWaypoints();
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
        }
    }
};
TripService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TripService);
export { TripService };
//# sourceMappingURL=trip.service.js.map