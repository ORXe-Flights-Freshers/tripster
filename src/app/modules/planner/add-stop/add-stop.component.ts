import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material/dialog';
import { TimePickerThemeService } from '../../../services/TimePickerTheme.service';
import { TripService } from 'src/app/services/trip.service';
import { HttpClient } from '@angular/common/http';
import { Time } from '../../../models/Time';
import { Stop } from 'src/app/models/Stop';
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
  departureTime = '11:00 am';
  duplicatePlace: boolean;
  invalidTimeError: boolean;
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
    this.departureDate = new Date(this.arrivalDate);
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
      //   console.log(response);
      // this.timeTaken=response.rows[0].elements[0].duration.value;
      // console.log(previousLocationDeparture);
      // console.log(self.arrivalDate);
      self.arrivalDate.setTime(
        previousLocationDeparture.getTime() +
          response.rows[0].elements[0].duration.value * 1000
      );
      console.log(self.arrivalDate);
      self.arrivalDate = new Date(self.arrivalDate);
      self.handleArrivalTimeSet(self.arrivalDate);
      self.departureDate = new Date(self.arrivalDate);
      self.departureTime =
        self.departureDate.getHours().toString() +
        ':' +
        self.departureDate.getMinutes().toString() +
        ' am';
      self.changeDetectorRef.detectChanges();
    }
  }

  handleArrivalTimeSet(date) {
    this.arrivalTime =
      date.getHours().toString() + ':' + date.getMinutes().toString() + ' am';
    console.log(this.arrivalTime);
  }

  handleDepartureTimeSet(time: string) {
    this.departureTime = time;
    const newDeparturetime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDeparturetime.hours);
    this.departureDate.setMinutes(newDeparturetime.minutes);
    if (this.departureDate < this.arrivalDate) {
      this.invalidTimeError = true;
    } else {
      this.invalidTimeError = false;
    }
  }
  getMinDate() {
    return new Date(this.arrivalDate);
  }
  handleArrivalDateSet(date) {
    console.log(this.arrivalDate);
  }
  handleDepartureDateSet(date) {
    this.departureDate = new Date(date.value);
    const newDeparturetime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDeparturetime.hours);
    this.departureDate.setMinutes(newDeparturetime.minutes);
    if (this.departureDate < this.arrivalDate) {
      this.invalidTimeError = true;
    } else {
      this.invalidTimeError = false;
    }

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
