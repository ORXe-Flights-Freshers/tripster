import { Component, OnInit, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import { Attraction } from '@models/Attraction';
import { TripService } from '@services/trip.service';
import { AddAttractionDetailsComponent } from '../add-attraction-details/add-attraction-details.component';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.css']
})
export class AttractionCardComponent implements OnInit {
  @Input() stopIdOfAttraction: string;
  @Input() attractionData: Attraction;

  constructor(public tripService: TripService,
              public dialog: MatDialog
  ) {}

  ngOnInit() {
    // console.log(this.imageUrl);
  }

  openAttractionDialog(attractionData): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '510px';

    dialogConfig.data = {attractionData, stopIdOfAttraction: this.stopIdOfAttraction} ;
    const dialogRef = this.dialog.open(AddAttractionDetailsComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(placeFromDialog => {
        this.tripService.displayTimeline = false;

        if (placeFromDialog) {
          this.tripService.addAttractionToTrip(placeFromDialog, this.stopIdOfAttraction);
          // this.openSnackBar('Attraction Added Successfully', 'OK');
        }
      });
}

}
