import { Injectable } from "@angular/core";
import { Trip } from "../models/Trip";
import { HttpClient } from "@angular/common/http";
import { Stop } from '../models/Stop';

@Injectable({
  providedIn: "root"
})
export class TripService {
  trip: Trip;
 waypoints: google.maps.DirectionsWaypoint[];
 // waypointLocation:location{lat:number,lng:number}[];
  directionResult: google.maps.DirectionsResult;
 
  testStop:Stop;
  constructor(private http: HttpClient) {}

  createTrip(trip: Trip) {
    this.trip = trip;
    // console.log("trip.service", trip);
    return this.http.post("http://localhost:5000/api/trip", trip);
  }

  handleDirectionResponse(directionResult: google.maps.DirectionsResult) {
    if (directionResult.routes[0].legs[0]) {
      let destinationArrival = new Date(this.trip.destination.arrival);
      console.log(destinationArrival);
      destinationArrival.setSeconds(
        destinationArrival.getSeconds() +
          directionResult.routes[0].legs[0].duration.value
      );
      this.trip.destination.arrival = destinationArrival.toString();

      console.log(this.trip.destination.arrival);
    
    }
  }

addStopToTrip(stop:Stop,stopIndex:number){
     console.log("Stop object at trip service:"+stop);
     console.log("Stop to be entered at:"+stopIndex);
    this.trip.stops[stopIndex]=stop;
    console.log(this.trip.stops);
     this.updateWaypoints();
}

updateWaypoints(){

  if(this.trip.stops.length!=0){
       
   var allStops=this.trip.stops;

    for(var index=0; index < this.trip.stops.length; index++ ){
       
      var waypointLocation={
        lat: allStops[index].location.latitude, 
        lng: allStops[index].location.longitude
      }

     // this.waypoints.push({  lat: allStops[index].location.latitude, lng: allStops[index].location.longitude ,"stopover":false});
      
    }

  }

  
}
 



}
