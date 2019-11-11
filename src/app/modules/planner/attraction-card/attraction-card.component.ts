import { Component, OnInit, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import { Attraction } from 'src/app/models/Attraction';
import { TripService } from 'src/app/services/trip.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AddAttractionDetailsComponent } from '../add-attraction-details/add-attraction-details.component';
@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.css']
})
export class AttractionCardComponent implements OnInit {
  @Input() stopIdOfAttraction: string;
  @Input() attractionData: Attraction;
  @Input() imageUrl =
    'https://images.wallpaperscraft.com/image/room_style_hotel_bed_70002_1920x1080.jpg';


  constructor(public tripService: TripService, public dialog: MatDialog, private snackBar: MatSnackBar) {

  }

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
        console.log(placeFromDialog);
        if (placeFromDialog) {
          console.log(placeFromDialog);
          this.tripService.addAttractionToTrip(placeFromDialog, this.stopIdOfAttraction);
          //this.openSnackBar('Attraction Added Sucessfully', 'OK');
        }
      });
}

}
