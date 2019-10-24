import { Component, OnInit } from "@angular/core";
import { TripService } from "src/app/services/trip.service";
import { Stop } from "src/app/models/Stop";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"]
})
export class TimelineComponent implements OnInit {
  constructor(public tripService: TripService) {}

  ngOnInit() {}

addStop(){
  
  let stopToAdd=this.generateStop();
  let lastStopIndex=this.tripService.trip.stops.length;
  this.tripService.addStopToTrip(stopToAdd,lastStopIndex);
  
}

generateStop(): Stop{
    let testStop:Stop;
    testStop= {
      location: {
        latitude: 22,
        longitude: 75
      },
      stopId: "xyz",
      name: "Indore",
      arrival: "Sun Oct 27 2019 00:08:51 GMT+0530 (India Standard Time)",
      departure: "Sun Oct 27 2019 00:08:51 GMT+0530 (India Standard Time)",
      places: []
    }
    return testStop;
}


}
