import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Stop } from '@models/Stop';
import { TripService } from '@services/trip.service';
import { Hotel } from '@models/Hotel';
import { FormControl } from '@angular/forms';

interface HotelResult {
  id: string;
  name: string;
  contact: {
    address: {
      line1: string,
      line2: string
    }
  };
  geoCode: {
    lat: number,
    long: number
  };
  rating: number;
}


@Component({
  selector: 'app-hotel-card-list',
  templateUrl: './hotel-card-list.component.html',
  styleUrls: ['./hotel-card-list.component.css']
})
export class HotelCardListComponent implements OnInit {
  arrHotels: Hotel[] = [];
  stopIdOfHotel: string;
  chosenCity: string;
  displayLoader: boolean;
  radius = 2;
  maxRadius = 5;
  stop: Stop;
  search: FormControl = new FormControl('');
  searchQuery = '';

  @ViewChild('noHotelsFound', {static: false}) noHotelsFoundElement: ElementRef;

  constructor(
    private httpService: HttpClient,
    public tripService: TripService
  ) {
    this.displayLoader = false;
  }

  ngOnInit() {
    if (this.tripService.trip.stops.length === 0) {
      this.hotelByStop(this.tripService.trip.destination);
    } else {
      this.hotelByStop(this.tripService.trip.stops[0]);
    }
    this.search.valueChanges.subscribe(val => this.searchPlace(val));
  }

  hotelByStop(stop: Stop) {
    this.displayLoader = true;
    this.stop = stop;
    this.httpService
      .get('https://tripster-tavisca.firebaseio.com/hotels-api-ip.json')
      .subscribe(
        hotelsApiDetails => {
          const hotelsApiEndpoint: {
            [ipObj: string]: { [ip: string]: string };
          } = {};
          for (const key in hotelsApiDetails) {
            if (hotelsApiDetails.hasOwnProperty(key)) {
              hotelsApiEndpoint.ipObj = hotelsApiDetails[key];
            }
          }

          console.log(hotelsApiEndpoint.ipObj.ip);

          // Production Data Link
          const hotelsApiUrl = 'http://' + hotelsApiEndpoint.ipObj.ip + '/api/hotels/' +
              stop.location.latitude +
              '/' +
              stop.location.longitude +
              '/' +
              this.radius;

          // Mock Data Link
          // const hotelsApiUrl = 'https://hotel-mock.s3.us-east-2.amazonaws.com/hotel.json';

          this.httpService
            .get(
              hotelsApiUrl
            )
            .subscribe(
              (data: { hotels: [] }) => {
                this.chosenCity = stop.name;
                this.stopIdOfHotel = stop.stopId;
                this.arrHotels = [];

                for (const hotelData of data.hotels) {
                  this.arrHotels.push(this.getHotelData(hotelData));
                }
                this.displayLoader = false;
                if (this.arrHotels.length === 0) {
                  let displayText = `No hotels found at ${stop.name}. `;

                  if (this.radius !== this.maxRadius) {
                    displayText += 'Increasing the radius may help.';
                  } else {
                    displayText += 'Please check for other stops.';
                  }

                  (this.noHotelsFoundElement.nativeElement as HTMLDivElement).innerText = displayText;
                  if (!(this.noHotelsFoundElement.nativeElement as HTMLDivElement)
                    .classList.contains('no-hotels-found')) {
                    (this.noHotelsFoundElement.nativeElement as HTMLDivElement)
                      .classList.add('no-hotels-found');
                  }
                } else {
                  (this.noHotelsFoundElement.nativeElement as HTMLDivElement).innerText = '';
                  if ((this.noHotelsFoundElement.nativeElement as HTMLDivElement)
                    .classList.contains('no-hotels-found')) {
                    (this.noHotelsFoundElement.nativeElement as HTMLDivElement)
                      .classList.remove('no-hotels-found');
                  }
                }
              },
              (error: HttpErrorResponse) => {
                (this.noHotelsFoundElement.nativeElement as HTMLDivElement).innerText =
                    `Error occurred. ${error.statusText}`;
                this.displayLoader = false;
              }
            );
        },
        (error: HttpErrorResponse) => {
          (this.noHotelsFoundElement.nativeElement as HTMLDivElement).innerText =
              `Error occurred. ${error.statusText}`;
          this.displayLoader = false;
        });
  }

  getHotelData(hotelDataApi: HotelResult) {
    const hotelData: Hotel = {
      placeId: hotelDataApi.id,
      name: hotelDataApi.name,
      description:
        hotelDataApi.contact.address.line1 +
        ',' +
        hotelDataApi.contact.address.line2,
      location: {
        latitude: hotelDataApi.geoCode.lat,
        longitude: hotelDataApi.geoCode.long
      },
      rating: hotelDataApi.rating,

      imageUrl: 'assets\\img\\hotel-demo.jpg',
      arrival: '',
      departure: ''
    };
    return hotelData;
  }

  handleRadiusChange(radiusSliderChange: Event) {
    this.radius = +(radiusSliderChange.target as HTMLInputElement).value;
    this.hotelByStop(this.stop);
  }
  searchPlace(searchQuery: string) {
    this.searchQuery = searchQuery;
  }
  handleSearchBarOpen() {
    this.search.setValue('');
  }
}
