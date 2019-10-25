import { Component, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Stop } from 'src/app/models/Stop';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-hotel-card-list',
  templateUrl: './hotel-card-list.component.html',
  styleUrls: ['./hotel-card-list.component.css']
})
export class HotelCardListComponent {
  @Input() numberOfHotels = 123;
  arrHotels;
  cities: Stop[];

  constructor(
    private httpService: HttpClient,
    public tripService: TripService
  ) {
    console.log(tripService.trip);
    // this.cities = tripService.trip.stops;
    // this.httpService.get("./assets/hotels.json").subscribe(
    //   data => {
    //     this.arrHotels = data as object[]; // FILL THE ARRAY WITH DATA.
    //     //  console.log(this.arrBirds[1]);
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log(err.message);
    //   }
    // );
    // this.httpService.get("./assets/cities.json").subscribe(
    //   data => {
    //     this.cities = data as object[]; // FILL THE ARRAY WITH DATA.
    //     //  console.log(this.arrBirds[1]);
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log(err.message);
    //   }
    // );
    // this.httpService
    //   .get('http://172.16.5.170:5000/api/values/30.3164945/78.03219179999996')
    //   .subscribe(
    //     (data: {hotels: []}) => {
    //       console.log(data);
    //       this.arrHotels = data.hotels; // FILL THE ARRAY WITH DATA.
    //     },
    //     (err: HttpErrorResponse) => {
    //       console.log(err.message);
    //     }
    //   );
  }

  hotelByStop(stop: Stop) {
    this.httpService
      .get(
        // 'http://172.16.5.170:5000/api/values/' +
        'http://172.16.5.149:5000/api/values/' +
          stop.location.latitude +
          '/' +
          stop.location.longitude
      )
      .subscribe(
        (data: {hotels: []}) => {
          this.arrHotels = data.hotels; // FILL THE ARRAY WITH DATA.
          //  console.log(this.arrBirds[1]);
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
  }
}
