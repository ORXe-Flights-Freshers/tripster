import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HotelCardListComponent = class HotelCardListComponent {
    constructor(httpService, tripService) {
        this.httpService = httpService;
        this.tripService = tripService;
        console.log(tripService.trip);
        this.displayLoader = false;
    }
    ngOnInit() {
        this.hotelByStop(this.tripService.trip.source);
    }
    hotelByStop(stop) {
        this.displayLoader = true;
        this.httpService
            .get('http://172.16.5.137:5000/api/values/' +
            stop.location.latitude +
            '/' +
            stop.location.longitude)
            .subscribe((data) => {
            this.chosenCity = stop.name;
            this.arrHotels = data.hotels;
            //  console.log(this.arrBirds[1]);
            this.displayLoader = false;
        }, (err) => {
            console.log(err.message);
        });
    }
};
HotelCardListComponent = tslib_1.__decorate([
    Component({
        selector: 'app-hotel-card-list',
        templateUrl: './hotel-card-list.component.html',
        styleUrls: ['./hotel-card-list.component.css']
    })
], HotelCardListComponent);
export { HotelCardListComponent };
//# sourceMappingURL=hotel-card-list.component.js.map