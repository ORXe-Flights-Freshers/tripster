import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  MatDialogRef
} from '@angular/material/dialog';

import { TimePickerThemeService } from '@services/TimePickerTheme.service';
import { TripService } from '@services/trip.service';
import { HttpClient } from '@angular/common/http';
import { Time } from '@models/Time';
import { Stop } from '@models/Stop';
@Component({
  selector: 'app-add-stop',
  templateUrl: './add-stop.component.html',
  styleUrls: ['./add-stop.component.css']
})
export class AddStopComponent implements OnInit {
  stopCity: google.maps.places.PlaceResult;

  arrivalDate: Date;
  departureDate: Date;
  arrivalTime = '00:00 am';
  departureTime = '00:00 am';
  duplicatePlace: boolean;
  invalidTimeError: boolean;
  invalidPlace: boolean;
  minTime: Date;
  constructor(
    public dialogRef: MatDialogRef<AddStopComponent>,
    public tripService: TripService,
    private http: HttpClient,
    public timePickerThemeService: TimePickerThemeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.arrivalDate = new Date(
      this.tripService.getPreviousLocation().departure
    );
    this.departureDate = new Date(this.arrivalDate.getTime() + 60000);
    this.departureTime =  this.departureDate.getHours().toString() +
    ':' +
    this.departureDate.getMinutes().toString() +
    ' am';
    this.minTime = this.getMinTime();
  }

  handleStopPlaceChange(place: google.maps.places.PlaceResult) {
    this.stopCity = place;
    const previousLocation = this.tripService.getPreviousLocation();
    console.log('stop city is', this.stopCity.place_id);
    console.log('previous stop is ', previousLocation.stopId);
    if (this.stopCity.place_id === previousLocation.stopId ||
      this.stopCity.place_id === this.tripService.trip.destination.stopId) {
      console.log('same stop found!!');
      this.duplicatePlace = true;
      this.changeDetectorRef.detectChanges();
      return;
    }
    this.duplicatePlace = false;
    const startPoint = new google.maps.LatLng(
      previousLocation.location.latitude,
      previousLocation.location.longitude
    );
    const endPoint = new google.maps.LatLng(
      place.geometry.location.lat(),
      place.geometry.location.lng()
    );
    const previousLocationDeparture = new Date(previousLocation.departure);

    const self = this;
    const distanceMatrixService = new google.maps.DistanceMatrixService();

    distanceMatrixService.getDistanceMatrix(
      {
        origins: [startPoint],
        destinations: [endPoint],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      },
      callback
    );

    function callback(response, status) {
      self.arrivalDate.setTime(
        previousLocationDeparture.getTime() +
          response.rows[0].elements[0].duration.value * 1000
      );
      console.log(self.arrivalDate);
      self.arrivalDate = new Date(self.arrivalDate);
      self.handleArrivalTimeSet(self.arrivalDate);
      self.departureDate = new Date(self.arrivalDate.getTime() + 60000);
      self.departureTime =
        self.departureDate.getHours().toString() +
        ':' +
        self.departureDate.getMinutes().toString() +
        ' am';
      self.changeDetectorRef.detectChanges();
      self.minTime = self.getMinTime();
    }
  }

  handleArrivalTimeSet(date) {
    this.arrivalTime =
      date.getHours().toString() + ':' + date.getMinutes().toString() + ' am';
    console.log(this.arrivalTime);
  }

  handleDepartureTimeSet(time: string) {
    this.departureTime = time;
    const newDepartureTime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDepartureTime.hours);
    this.departureDate.setMinutes(newDepartureTime.minutes);

    this.validateDateTime();
  }

  getMinDate() {
    return new Date(this.arrivalDate);
  }
  getMinTime() {
    if ( this.isDepartureDateMore()) {
      return new Date((new Date(this.arrivalDate)).setHours(0 , 0));
    }
    return new Date(this.arrivalDate);
  }

  isDepartureDateMore(): boolean {
    if (this.departureDate.getFullYear() > this.arrivalDate.getFullYear() ) {
      return true;
    }
    if (this.departureDate.getMonth() > this.arrivalDate.getMonth() ) {
      return true;
    }
    if (this.departureDate.getDate() > this.arrivalDate.getDate()  ) {
      return true;
    }
    return false;
  }

  handleArrivalDateSet(date) {
    console.log(this.arrivalDate);
  }

  handleDepartureDateSet(date) {
    this.departureDate = new Date(date.value);
    const newDepartureTime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDepartureTime.hours);
    this.departureDate.setMinutes(newDepartureTime.minutes);
    this.minTime = this.getMinTime();
    this.validateDateTime();
  }

  validateDateTime() {
    this.invalidTimeError = this.departureDate <= this.arrivalDate;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addStop() {
    const stop: Stop = {
      stopId: this.stopCity.place_id,
      location: {
        latitude: this.stopCity.geometry.location.lat(),
        longitude: this.stopCity.geometry.location.lng()
      },
      name: this.stopCity.name,
      arrival: this.arrivalDate.toString(),
      departure: this.departureDate.toString(),
      hotels: [],
      attractions: []
    };
    console.log(stop);
    this.dialogRef.close(stop);
  }
}
