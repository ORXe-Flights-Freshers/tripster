import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { AddHotelDetailsComponent } from '../add-hotel-details/add-hotel-details.component';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import { Hotel } from '@models/Hotel';
import { TripService } from '@services/trip.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {
  @Input() stopIdOfHotel: string;
  @Input() hotelData: Hotel;
  @Input() imageUrl =
  'https://images.wallpaperscraft.com/image/room_style_hotel_bed_70002_1920x1080.jpg';

  @ViewChild('headingDetails', { static: false }) headingDetails: ElementRef;

  constructor( public tripService: TripService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.imageUrl = 'http://lorempixel.com/200/200/city/?id=' + Math.random();
  }

  ngOnInit() {}

  openHotelDialog(hotelData): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '510px';

    dialogConfig.data = {hotelData, stopIdOfHotel: this.stopIdOfHotel} ;
    const dialogRef = this.dialog.open(AddHotelDetailsComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(placeFromDialog => {
        console.log(placeFromDialog);
        if (placeFromDialog) {
          console.log(placeFromDialog);
          this.tripService.addHotelToTrip(placeFromDialog, this.stopIdOfHotel);
          this.openSnackBar('Hotel Added Successfully', 'OK');
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onHeadingOver() {
    (this.headingDetails.nativeElement as HTMLDivElement).innerText = this.hotelData.name;
    if (!(this.headingDetails.nativeElement as HTMLDivElement).classList.contains('heading-details')) {
      (this.headingDetails.nativeElement as HTMLDivElement).classList.add('heading-details');
    }
  }

  onHeadingOut() {
    (this.headingDetails.nativeElement as HTMLDivElement).innerText = '';
    if ((this.headingDetails.nativeElement as HTMLDivElement).classList.contains('heading-details')) {
      (this.headingDetails.nativeElement as HTMLDivElement).classList.remove('heading-details');
    }
  }
}
