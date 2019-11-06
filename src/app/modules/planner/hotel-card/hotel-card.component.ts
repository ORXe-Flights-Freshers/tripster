import { Component, OnInit, Input } from '@angular/core';
import { AddHotelDetailsComponent } from '../add-hotel-details/add-hotel-details.component';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {
  @Input() hotelId: string;
  @Input() stopId: string;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() imageUrl =
    'https://images.wallpaperscraft.com/image/room_style_hotel_bed_70002_1920x1080.jpg';
  @Input() name = 'Hotel Vistara';
  @Input() rating = 4;
  @Input() description = 'swimming parking playground cab';
  @Input() hotelData = {name: '', description: '', rating: ''};
  constructor( public dialog: MatDialog) {}

  ngOnInit() {}

  openHotelDialog(hotelParentData): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '510px';

    dialogConfig.data = hotelParentData;
    const dialogRef = this.dialog.open(AddHotelDetailsComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(placeFromDialog => {
        console.log(placeFromDialog);
        if (placeFromDialog) {}
      });
  }

}
