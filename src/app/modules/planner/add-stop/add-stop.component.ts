import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {TimePickerThemeService} from '@services/TimePickerTheme.service';
import {TripService} from '@services/trip.service';
import {HttpClient} from '@angular/common/http';
import {Time} from '@models/Time';
import {Stop} from '@models/Stop';

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
  invalidTime: boolean;
  duplicatePlace: boolean;
  isCityValid: boolean;
  minTime: Date;

  constructor(
    public dialogRef: MatDialogRef<AddStopComponent>,
    public tripService: TripService,
    private http: HttpClient,
    public timePickerThemeService: TimePickerThemeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.arrivalDate = new Date(
      this.tripService.getPreviousLocationOfDestination().departure
    );
    this.departureDate = new Date(this.arrivalDate.getTime() + 60000);
    this.departureTime =  this.departureDate.getHours().toString() +
    ':' +
    this.departureDate.getMinutes().toString() +
    ' am';
    this.minTime = this.getMinTime();
    this.isCityValid = false;
  }

  handleStopPlaceChange(place: google.maps.places.PlaceResult) {
    this.stopCity = place;
    this.isCityValid = true;
    const previousLocation = this.tripService.getPreviousLocationOfDestination();
    if (this.stopCity.place_id === previousLocation.stopId ||
      this.stopCity.place_id === this.tripService.trip.destination.stopId) {
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

    distanceMatrixService.getDistanceMatrix({
      origins: [startPoint],
      destinations: [endPoint],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, callback);

    function callback(response, status) {
      self.arrivalDate.setSeconds(
        previousLocationDeparture.getSeconds() +
        response.rows[0].elements[0].duration.value
      );

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
  }

  handleDepartureTimeSet(time: string) {
    this.departureTime = time;
    const newDepartureTime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDepartureTime.hours);
    this.departureDate.setMinutes(newDepartureTime.minutes);
  }

  getMinDate() {
    return new Date(this.arrivalDate);
  }

  getMinTime() {
    if (this.isDepartureDateMore()) {
      return new Date((new Date(this.arrivalDate)).setHours(0, 0));
    }
    return new Date(this.arrivalDate);
  }

  isDepartureDateMore(): boolean {
    if (this.departureDate.getFullYear() > this.arrivalDate.getFullYear()) {
      return true;
    }
    if (this.departureDate.getMonth() > this.arrivalDate.getMonth()) {
      return true;
    }
    return this.departureDate.getDate() > this.arrivalDate.getDate();
  }

  handleDepartureDateSet(date) {
    this.departureDate = new Date(date.value);
    const newDepartureTime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDepartureTime.hours);
    this.departureDate.setMinutes(newDepartureTime.minutes);
    this.minTime = this.getMinTime();
    this.invalidTime = this.validateTime();
  }

  validateTime(): boolean {
    if (this.departureDate < this.arrivalDate) {
      return true;
    }
    return false;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addStop() {
    this.tripService.addStopToTrip(this.generateStop())
    this.dialogRef.close('success');
  }

  generateStop(): Stop {
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
   return stop;
 }

}
