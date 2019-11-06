import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.css']
})
export class AttractionCardComponent implements OnInit {
  @Input() attractionId: string;
  @Input() stopId: string;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() imageUrl =
    'https://images.wallpaperscraft.com/image/room_style_hotel_bed_70002_1920x1080.jpg';
  @Input() name = 'Attraction';
  @Input() rating = 4;
  @Input() description = 'swimming parking playground cab';
  constructor() {}

  ngOnInit() {}
}
