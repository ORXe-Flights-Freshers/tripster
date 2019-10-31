import {Component, Input, OnInit} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Stop } from 'src/app/models/Stop';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-hotel-card-list',
  templateUrl: './hotel-card-list.component.html',
  styleUrls: ['./hotel-card-list.component.css']
})
export class HotelCardListComponent implements OnInit {
  arrHotels;
  chosenCity: string;
  displayLoader: boolean;

  constructor(
    private httpService: HttpClient,
    public tripService: TripService) {
    console.log(tripService.trip);
    this.displayLoader = false;
  }
  ngOnInit() {
    this.hotelByStop(this.tripService.trip.source);
  }
  hotelByStop(stop: Stop) {
    this.displayLoader = true;
    this.httpService
      .get(
        'http://172.16.5.137:5000/api/values/' +
          stop.location.latitude +
          '/' +
          stop.location.longitude
      )
      .subscribe(
        (data: {hotels: []}) => {
          this.chosenCity = stop.name;
          this.arrHotels = data.hotels;
          //  console.log(this.arrBirds[1]);
          this.displayLoader = false;
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
  }
}
