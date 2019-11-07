import { Component, OnInit, Input } from '@angular/core';
import { AddHotelDetailsComponent } from '../add-hotel-details/add-hotel-details.component';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import { Hotel } from 'src/app/models/Hotel';
import { TripService } from 'src/app/services/trip.service';
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


  constructor( public tripService: TripService, public dialog: MatDialog) {}

  ngOnInit() {}

  openHotelDialog(hotelData): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '510px';

    dialogConfig.data = {hotelData, stopId: this.stopIdOfHotel} ;
    const dialogRef = this.dialog.open(AddHotelDetailsComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(placeFromDialog => {
        console.log(placeFromDialog);
        if (placeFromDialog) {
          console.log(placeFromDialog);
          this.tripService.addHotelToTrip(placeFromDialog);
        }
      });
  }

  closeHotelDialog() {
    this.dialog.closeAll();
  }

}
