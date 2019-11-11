import { Component, Input, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { AddStopComponent } from '../add-stop/add-stop.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ShareTripComponent } from '../share-trip/share-trip.component';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  constructor(
    public tripService: TripService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  openStopDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '510px';

    const dialogRef = this.dialog.open(AddStopComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(stopFromDialog => {
      console.log(stopFromDialog);
      if (stopFromDialog) {
        const responseStatus = this.addStop(stopFromDialog);
        if (responseStatus) {
          this.openSnackBar('Stop Added Succesfully', 'OK');
        }
      }
    });
  }
  openShareTripDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.height = '250px';

    const dialogRef = this.dialog.open(ShareTripComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(stopFromDialog => {
    //   console.log(stopFromDialog);
    //   if (stopFromDialog) {
    //     const responseStatus = this.addStop(stopFromDialog);
    //     if (responseStatus) {
    //       this.openSnackBar('Stop Added Succesfully', 'OK');
    //     }
    //   }
    // });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  addStop(stop): boolean {
   const responseMessage = this.tripService.addStopToTrip(stop);
   return responseMessage === 'success';
  }

  closeStopDialog() {
    this.dialog.closeAll();
  }
  deleteStop(i: number) {
    // @ts-ignore
    const responseMessage = this.tripService.removeStopFromTrip(i);
    if (responseMessage === 'success') {
      this.openSnackBar('Stop Deleted Successfuly', 'OK');
      } else {
        this.openSnackBar('Stop Deletion Failed!', 'OK');
      }

  }
  getEmailString() {
    return (
      'mailto:?Subject=Shared RoadTrip from Tripster&body=Hey, Here is the shareable link for the roadtrip : http://3.14.69.62:82' +
      this.router.url
    );
  }
  getNavigationUrl() {
    let url = '';
    if (this.tripService.trip) {
      url =
        'https://www.google.com/maps/dir/?api=1&origin=' +
        this.tripService.trip.source.name +
        '&destination=' +
        this.tripService.trip.destination.name +
        '&travelmode=driving&waypoints=';
      this.tripService.waypoints.forEach(waypoint => {
        url += waypoint.location.lat + ',' + waypoint.location.lng + '|';
      });
    }
    return url;
  }
}
