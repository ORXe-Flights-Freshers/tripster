import {Component, Input, OnInit} from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { AddStopComponent } from '../add-stop/add-stop.component';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor(public tripService: TripService,
              public dialog: MatDialog) {}

  ngOnInit() {}

  openStopDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '510px';

    const dialogRef = this.dialog.open(AddStopComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(stopFromDialog => {
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
    console.log('Delete');
  }
}
