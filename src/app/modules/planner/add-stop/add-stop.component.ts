import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material/dialog';
import {TimePickerThemeService} from '../../../services/TimePickerTheme.service';

@Component({
  selector: 'app-add-stop',
  templateUrl: './add-stop.component.html',
  styleUrls: ['./add-stop.component.css']
})


export class AddStopComponent implements OnInit {
  stopCity: google.maps.places.PlaceResult;
  arrivalDate: Date = new Date(Date.now());
  departureDate: Date = new Date(Date.now());
  arrivalTime = '11:00 am';
  departureTime = '11:00 am';
  constructor(public dialogRef: MatDialogRef<AddStopComponent>,
              public timePickerThemeService: TimePickerThemeService) { }

  ngOnInit() {}

  handleStopPlaceChange(place: google.maps.places.PlaceResult) {
    this.stopCity = place;
    console.log(place);
  }
  handleArrivalTimeSet(time: string) {
    this.arrivalTime = time;
  }
  handleDepartureTimeSet(time: string) {
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

   const stop = {
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
}
