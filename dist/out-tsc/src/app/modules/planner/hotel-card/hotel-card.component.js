import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let HotelCardComponent = class HotelCardComponent {
    constructor() {
        this.imageUrl = 'https://images.wallpaperscraft.com/image/room_style_hotel_bed_70002_1920x1080.jpg';
        this.name = 'Hotel Vistara';
        this.rating = 4;
        this.description = 'swimming parking playground cab';
    }
    ngOnInit() { }
};
tslib_1.__decorate([
    Input()
], HotelCardComponent.prototype, "hotelId", void 0);
tslib_1.__decorate([
    Input()
], HotelCardComponent.prototype, "stopId", void 0);
tslib_1.__decorate([
    Input()
], HotelCardComponent.prototype, "latitude", void 0);
tslib_1.__decorate([
    Input()
], HotelCardComponent.prototype, "longitude", void 0);
tslib_1.__decorate([
    Input()
], HotelCardComponent.prototype, "imageUrl", void 0);
tslib_1.__decorate([
    Input()
], HotelCardComponent.prototype, "name", void 0);
tslib_1.__decorate([
    Input()
], HotelCardComponent.prototype, "rating", void 0);
tslib_1.__decorate([
    Input()
], HotelCardComponent.prototype, "description", void 0);
HotelCardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-hotel-card',
        templateUrl: './hotel-card.component.html',
        styleUrls: ['./hotel-card.component.css']
    })
], HotelCardComponent);
export { HotelCardComponent };
//# sourceMappingURL=hotel-card.component.js.map