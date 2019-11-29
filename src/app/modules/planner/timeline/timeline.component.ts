import {Component, OnInit} from '@angular/core';
import {TripService} from '@services/trip.service';
import {AddStopComponent} from '../add-stop/add-stop.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShareTripComponent} from '../share-trip/share-trip.component';
import { TimePickerThemeService } from '@services/TimePickerTheme.service';
import { LoginService } from '@services/login.service';
import {AnalyticsService} from '@services/analytics.service';
import { Trip } from '@models/Trip';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  durationBetweenStops: string[];
  durationsMarginTop: number[];
  navigationUrl: string;
  constructor(
    public tripService: TripService,
    public dialog: MatDialog,
    private router: Router,
    public analytics: AnalyticsService,
    private snackBar: MatSnackBar,
    public loginService: LoginService) {
      this.durationsMarginTop = [130, ];
  }

  ngOnInit() {

    this.tripService.stopSubject.subscribe(_ => {
      this.durationsMarginTop = [130, ];
      this.durationBetweenStops = [];

      this.tripService.trip.stops.forEach((stop, index) => {
        this.durationsMarginTop.push(137 + this.getNumberOfPlacesAtStop(index) * 76);
      });
      this.durationBetweenStops = this.tripService.getTimeBetweenStops();
    });
    this.durationBetweenStops = this.tripService.getTimeBetweenStops();

    if (this.tripService.trip) {
      this.tripService.stopSubject.next(this.tripService.trip.source);
    }

  }

  getNumberOfPlacesAtStop(index: number) {
    if (!this.tripService.trip) {
      return 0;
    }

    if (!this.tripService.trip.stops) {
      return 0;
    }

    const stop = this.tripService.trip.stops[index];

    if (!stop) {
      return 0;
    }
    return stop.hotels.length + stop.attractions.length;
  }

  openStopDialog(): void {
    if (this.loginService.canModifyTrip) {
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
    } else {
      this.openSnackBar('You are not authorized to modify this trip', 'OK');
    }
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

  navigateToMaps() {
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
    window.open(url, '_blank');
  }

  saveAnonymousTrip() {
   if (this.loginService.loggedIn) {
      console.log('User is logged in');
      const newTrip = JSON.parse(JSON.stringify(this.tripService.trip));
      newTrip.userId = this.loginService.user.userId ;
      delete newTrip.id;
      console.log(newTrip);
      this.analytics.eventEmitter('Planner', 'Saved anonymous trip')
      this.tripService.createTrip(newTrip).subscribe(data => {
        this.router.navigate(['/', 'planner', (data as Trip).id]).then();
      });
   } else {
      console.log('User has not logged in ,Make him to log in');
      this.loginService.openLoginDialog();
   }
  }
}
