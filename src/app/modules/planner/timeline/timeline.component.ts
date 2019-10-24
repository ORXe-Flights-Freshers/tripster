import { Component, OnInit } from "@angular/core";
import { TripService } from "src/app/services/trip.service";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"]
})
export class TimelineComponent implements OnInit {
  constructor(private tripService: TripService) {}

  ngOnInit() {}
}
