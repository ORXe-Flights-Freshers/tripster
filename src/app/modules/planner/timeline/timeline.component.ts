import {Component, OnInit} from '@angular/core';
import {TripService} from '@services/trip.service';
import {AddStopComponent} from '../add-stop/add-stop.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShareTripComponent} from '../share-trip/share-trip.component';
import { TimePickerThemeService } from '@services/TimePickerTheme.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  durationBetweenStops: string[];
  constructor(
    public tripService: TripService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.tripService.durationSubject.subscribe((durationBetweenStops: string[]) => {
      this.durationBetweenStops = durationBetweenStops;
    });
  }

  openStopDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '510px';

    const dialogRef = this.dialog.open(AddStopComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(stopFromDialog => {
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

  getNavigationUrl() {
    let url = '';
    if (this.tripService.trip) {
      url =
        'https://www.google.com/maps/dir/?api=1&origin=' +
        this.tripService.trip.source.name +
        '&destination=' +
        this.tripService.trip.destination.name +
        '&travelmode=driving&waypoints=';
      this.tripService.waypoints.forEach((waypoint, index) => {
        url += this.tripService.waypointsInfo[index].name + '|';
      });
      url += '&waypoint_place_ids=';
      this.tripService.waypoints.forEach((waypoint, index) => {
        url += this.tripService.waypointsInfo[index].placeId + '|';
      });

    }
    return url;
  }
}
