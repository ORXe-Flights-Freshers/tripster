import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AddStopComponent = class AddStopComponent {
    constructor(dialogRef, timePickerThemeService) {
        this.dialogRef = dialogRef;
        this.timePickerThemeService = timePickerThemeService;
        this.arrivalDate = new Date(Date.now());
        this.departureDate = new Date(Date.now());
        this.arrivalTime = '11:00 am';
        this.departureTime = '11:00 am';
    }
    ngOnInit() { }
    handleStopPlaceChange(place) {
        this.stopCity = place;
        console.log(place);
    }
    handleArrivalTimeSet(time) {
        this.arrivalTime = time;
    }
    handleDepartureTimeSet(time) {
        this.departureTime = time;
    }
    getMinDate() {
        return new Date(Date.now());
    }
    handleArrivalDateSet(date) {
        this.arrivalDate = new Date(date.value);
        console.log(this.arrivalDate);
    }
    handleDepartureDateSet(date) {
        this.departureDate = new Date(date.value);
        if (this.departureDate < this.arrivalDate) {
        }
    }
    closeDialog() {
        this.dialogRef.close();
    }
    addStop() {
        let stop = {
            location: {
                latitude: this.stopCity.geometry.location.lat(),
                longitude: this.stopCity.geometry.location.lng()
            },
            stopId: 'xyz',
            name: this.stopCity.name,
            arrival: this.arrivalDate.toString(),
            departure: this.departureDate.toString(),
            places: []
        };
        console.log(stop);
        this.dialogRef.close(stop);
    }
};
AddStopComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-stop',
        templateUrl: './add-stop.component.html',
        styleUrls: ['./add-stop.component.css']
    })
], AddStopComponent);
export { AddStopComponent };
//# sourceMappingURL=add-stop.component.js.map