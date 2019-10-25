import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TripService } from "src/app/services/trip.service";
import { HttpClient } from "@angular/common/http";
import { Trip } from "src/app/models/Trip";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from "@angular/material/dialog";
import { AddStopComponent } from "../add-stop/add-stop.component";

@Component({
  selector: "app-planner",
  templateUrl: "./planner.component.html",
  styleUrls: ["./planner.component.css"]
})
export class PlannerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public tripService: TripService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    // @ts-ignore
    const id = this.route.params.value.id;
    this.http.get("http://3.14.69.62:5000/api/trip/" + id).subscribe(data => {
      this.tripService.trip = data as Trip;
    });
    // console.log(this.route.params["value"]);
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    dialogConfig.height = "510px";

    this.dialog.open(AddStopComponent, dialogConfig);
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
