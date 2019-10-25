import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {
  @Input() hotelId: string;
  @Input() stopId:string;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() imageUrl =
    'https://images.wallpaperscraft.com/image/room_style_hotel_bed_70002_1920x1080.jpg';
  @Input() name = 'Hotel Vistara';
  @Input() rating = 4;
  @Input() description = 'swimming parking playground cab';
  constructor() {}

  ngOnInit() {}
}
