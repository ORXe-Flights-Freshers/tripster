import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Time } from '../../../models/Time';
let SearchComponent = class SearchComponent {
    constructor(tripService, router, timePickerThemeService) {
        this.tripService = tripService;
        this.router = router;
        this.timePickerThemeService = timePickerThemeService;
        this.tripDate = new Date(Date.now());
        this.placeId = '';
        this.tripTime = '11:00 am';
        this.vehicleMileage = 25;
        this.searchForm = new FormGroup({
            mileage: new FormControl(this.vehicleMileage, [Validators.pattern('^[1-9]+[0-9]*$')])
        });
    }
    ngOnInit() { }
    handleInvalidSource(event) {
        this.sourceValid = event.isValid;
    }
    handleInvalidDestination(event) {
        this.destinationValid = event.isValid;
    }
    handleSourceChange(place) {
        this.origin = place;
        if (this.placeId === '') {
            this.placeId = this.origin.place_id;
            return;
        }
        if (this.placeId === this.origin.place_id) {
            this.sourceDuplicate = true;
        }
        console.log('Source Duplicate? ', this.sourceDuplicate);
    }
    handleDestinationChange(place) {
        this.destination = place;
        if (this.placeId === '') {
            this.placeId = this.origin.place_id;
            return;
        }
        if (this.placeId === this.origin.place_id) {
            this.destinationDuplicate = true;
        }
        console.log('Destination Duplicate? ', this.destinationDuplicate);
    }
    handleTimeSet(time) {
        this.tripTime = time;
    }
    handleDateSet(date) {
        this.tripDate = new Date(date.value);
    }
    getMinDate() {
        return new Date(Date.now());
    }
    onSubmit() {
        const time = Time.parseTimeStringToTime(this.tripTime);
        this.tripDate.setHours(time.hours);
        this.tripDate.setMinutes(time.minutes);
        const trip = this.generateTrip();
        console.log(trip);
        this.tripService.createTrip(trip).subscribe(data => {
            console.log(data);
            // this.tripService.trip = data as Trip;
            // @ts-ignore
            this.router.navigate(['/', 'planner', data.id]);
            // console.log(data);
            console.log(new Date(data.destination.arrival));
        });
        // this.tripService.trip = trip;
        // this.router.navigate(["/", "planner", 123]);
        // console.log(this.tripDate);
    }
    generateTrip() {
        let trip;
        trip = {
            source: {
                location: {
                    latitude: this.origin.geometry.location.lat(),
                    longitude: this.origin.geometry.location.lng()
                },
                // @ts-ignore
                stopId: this.origin.id,
                name: this.origin.name,
                // @ts-ignore
                arrival: this.tripDate.toString(),
                // @ts-ignore
                departure: this.tripDate.toString(),
                places: []
            },
            destination: {
                location: {
                    latitude: this.destination.geometry.location.lat(),
                    longitude: this.destination.geometry.location.lng()
                },
                // @ts-ignore
                stopId: this.destination.id,
                name: this.destination.name,
                // @ts-ignore
                arrival: this.tripDate.toString(),
                // @ts-ignore
                departure: this.tripDate.toString(),
                places: []
            },
            stops: [],
            mileage: this.vehicleMileage
        };
        return trip;
    }
};
SearchComponent = tslib_1.__decorate([
    Component({
        selector: 'app-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map