import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'src/app/models/Trip';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material/dialog';
import { AddStopComponent } from '../add-stop/add-stop.component';
import { Stop } from 'src/app/models/Stop';
import {HeaderDataService} from '../../../services/HeaderData/header-data.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public tripService: TripService,
    private http: HttpClient,
    public dialog: MatDialog,
    private headerLinks: HeaderDataService) {
    this.headerLinks.customizeHeaderForPlannerPage();
  }

  ngOnInit() {
    // @ts-ignore
    const id = this.route.params.value.id;
    this.http.get('http://3.14.69.62:5000/api/trip/' + id).subscribe(data => {
      this.tripService.trip = data as Trip;
    });
    // console.log(this.route.params["value"]);
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '510px';


   const dialogRef=this.dialog.open(AddStopComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(stopFromDialog => {
      console.log(stopFromDialog);
      if (stopFromDialog) {
        this.addStop(stopFromDialog);
      }
    });
  }

  addStop(stop) {
    // let stopToAdd=this.generateStop(stop);
    this.tripService.addStopToTrip(stop);
  }
  closeDialog() {
    this.dialog.closeAll();
  }


}
