import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-hotel-card",
  templateUrl: "./hotel-card.component.html",
  styleUrls: ["./hotel-card.component.scss"]
})
export class HotelCardComponent implements OnInit {
  @Input() hotelId: string;
  @Input() stopId:string;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() imageUrl: string =
    "https://images.wallpaperscraft.com/image/room_style_hotel_bed_70002_1920x1080.jpg";
  @Input() name: string = "Hotel Vistara";
  @Input() rating: number = 4;
  @Input() description: string = "swimming parking playground cab";
  constructor() {}

  ngOnInit() {}
}
