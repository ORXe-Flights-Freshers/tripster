import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let MapComponent = class MapComponent {
    constructor(tripService) {
        this.tripService = tripService;
        console.log(this.tripService.trip);
    }
    ngOnInit() { }
};
MapComponent = tslib_1.__decorate([
    Component({
        selector: 'app-map',
        templateUrl: './map.component.html',
        styleUrls: ['./map.component.css']
    })
], MapComponent);
export { MapComponent };
//# sourceMappingURL=map.component.js.map