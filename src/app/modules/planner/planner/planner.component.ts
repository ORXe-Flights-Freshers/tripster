import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TripService } from "src/app/services/trip.service";
import { HttpClient } from "@angular/common/http";
import { Trip } from "src/app/models/Trip";
import { HeaderDataService } from "../../../services/HeaderData/header-data.service";

@Component({
  selector: "app-planner",
  templateUrl: "./planner.component.html",
  styleUrls: ["./planner.component.css"]
})
export class PlannerComponent implements OnInit {
  activeTab: string;

  constructor(
    public route: ActivatedRoute,
    public tripService: TripService,
    private http: HttpClient,
    private headerLinks: HeaderDataService
  ) {
    this.headerLinks.customizeHeaderForPlannerPage();
  }

  onClick() {
    console.log(this.route);
  }

  ngOnInit() {
    // @ts-ignore
    const tripId = this.route.params.value.id;
    this.tripService.getTrip(tripId);
    this.activeTab = "timeline";
  }
}
