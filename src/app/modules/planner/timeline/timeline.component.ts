import { Component, OnInit } from "@angular/core";
import { TripService } from "src/app/services/trip.service";
import { Stop } from "src/app/models/Stop";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  constructor(public tripService: TripService) {}

  ngOnInit() {}

  addStop(){
  
     let stopToAdd=this.generateStop();
     let lastStopIndex=this.tripService.trip.stops.length;
     this.tripService.addStopToTrip(stopToAdd);  
    }

  generateStop(): Stop{
    let testStop:Stop;
    testStop= {
      location: {
        latitude: 17.3850,
        longitude: 78.4867
      },
      stopId: "xyz",
      name: "Hyderabad",
      arrival: "Sun Oct 27 2019 00:08:51 GMT+0530 (India Standard Time)",
      departure: "Sun Oct 27 2019 00:08:51 GMT+0530 (India Standard Time)",
      places: []
     }
     return testStop;
    }


}
