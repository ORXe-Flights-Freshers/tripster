import { Component, Input, OnInit } from "@angular/core";
import { TripService } from "src/app/services/trip.service";
import { AddStopComponent } from "../add-stop/add-stop.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"]
})
export class TimelineComponent implements OnInit {
  constructor(
    public tripService: TripService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {}

  openStopDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    dialogConfig.height = "510px";

    const dialogRef = this.dialog.open(AddStopComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(stopFromDialog => {
      console.log(stopFromDialog);
      if (stopFromDialog) {
        this.addStop(stopFromDialog);
      }
    });
  }

  addStop(stop) {
    this.tripService.addStopToTrip(stop);
  }

  closeStopDialog() {
    this.dialog.closeAll();
  }
  deleteStop(i: number) {
    // @ts-ignore
    this.tripService.removeStopFromTrip(i);
    console.log("Delete");
  }
  getEmailString() {
    return (
      "mailto:?Subject=Shared RoadTrip from Tripster&body=Hey, Here is the shareable link for the roadtrip : http://3.14.69.62:82" +
      this.router.url
    );
  }
  getNavigationUrl() {
    let url: string = "";
    if (this.tripService.trip) {
      url =
        "https://www.google.com/maps/dir/?api=1&origin=" +
        this.tripService.trip.source.name +
        "&destination=" +
        this.tripService.trip.destination.name +
        "&travelmode=driving&waypoints=";
      this.tripService.waypoints.forEach(waypoint => {
        url += waypoint.location.lat + "," + waypoint.location.lng + "|";
      });
    }
    return url;
  }
}
