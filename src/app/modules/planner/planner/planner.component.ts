import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TripService } from "src/app/services/trip.service";
import { HttpClient } from "@angular/common/http";
import { Trip } from "src/app/models/Trip";

@Component({
  selector: "app-planner",
  templateUrl: "./planner.component.html",
  styleUrls: ["./planner.component.css"]
})
export class PlannerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    let id = this.route.params["value"].id;
    this.http
      .get("https://172.16.5.149:5001/api/trip/{{id}}")
      .subscribe(data => {
        this.tripService.trip = data as Trip;
      });
    //console.log(this.route.params["value"]);
  }
}
