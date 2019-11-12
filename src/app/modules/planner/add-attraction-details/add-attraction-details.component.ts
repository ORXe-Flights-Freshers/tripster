import { Component, OnInit ,Inject } from '@angular/core';
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
import { Attraction } from 'src/app/models/Attraction';
import {NavigatorService} from '../../../services/navigator.service';

@Component({
  selector: 'app-add-attraction-details',
  templateUrl: './add-attraction-details.component.html',
  styleUrls: ['./add-attraction-details.component.css']
})
export class AddAttractionDetailsComponent implements OnInit {
  attractionData: Attraction;
  stopIdOfAttraction: string;
  arrivalDate: Date;
  departureDate: Date;
  minArrivalDate: Date;
  maxDepartureDate: Date;
  arrivalTime = "00:00 am";
  departureTime = "00:00 am" ;
  invalidDepartureTimeError: boolean;
  invalidMoreArrivalTimeError: boolean;
  invalidLessArrivalTimeError: boolean;
  // invalidMoreArrivalTimeErrorDepart: boolean;
  constructor(
    public dialogRef: MatDialogRef<AddAttractionDetailsComponent>,
    public tripService: TripService,
    public navigatorService: NavigatorService,
    private http: HttpClient,
    public timePickerThemeService: TimePickerThemeService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
      console.log(data);
      this.attractionData = data.attractionData;
      this.stopIdOfAttraction = data.stopIdOfAttraction; }

  ngOnInit() {
    this.arrivalDate = new Date(this.getMinDate());
    this.departureDate = new Date(this.getMaxDate());
    this.departureTime = this.departureDate.getHours().toString() +
        ':' +  this.departureDate.getMinutes().toString() + ' am';
    this.arrivalTime = this.arrivalDate.getHours().toString() +
        ':' +  this.arrivalDate.getMinutes().toString() + ' am';
    this.maxDepartureDate = new Date(this.getMaxDate());
    this.minArrivalDate = new Date(this.getMinDate());
  }

  handleArrivalTimeSet(time: string) {
    this.arrivalTime = time;
    const newArrivalTime = Time.parseTimeStringToTime(this.arrivalTime);
    this.arrivalDate.setHours(newArrivalTime.hours);
    this.arrivalDate.setMinutes(newArrivalTime.minutes);
    this.validateDateTime();
  }
  handleDepartureTimeSet(time: string) {
    this.departureTime = time;
    const newdeparturetime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newdeparturetime.hours);
    this.departureDate.setMinutes(newdeparturetime.minutes);
    this.validateDateTime();
  }
  getMinDate() {
    return new Date(
      this.tripService.getStopByStopId(this.stopIdOfAttraction).arrival
    );
  }
  getMaxDate() {
    return new Date(
      this.tripService.getStopByStopId(this.stopIdOfAttraction).departure
    );
  }
  handleArrivalDateSet(date) {
    this.arrivalDate = new Date(date.value);
    const newArrivaltime = Time.parseTimeStringToTime(this.arrivalTime);
    this.arrivalDate.setHours(newArrivaltime.hours);
    this.arrivalDate.setMinutes(newArrivaltime.minutes);
    this.validateDateTime();
  }
  handleDepartureDateSet(date) {
    this.departureDate = new Date(date.value);
    const newDeparturetime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDeparturetime.hours);
    this.departureDate.setMinutes(newDeparturetime.minutes);
    this.validateDateTime();
  }

  validateDateTime() {
    if (this.departureDate < this.arrivalDate) {
      this.invalidMoreArrivalTimeError = true;
    } else {
      this.invalidMoreArrivalTimeError = false;
    }
    if (this.departureDate > this.maxDepartureDate) {
      this.invalidDepartureTimeError = true;
    } else {
      this.invalidDepartureTimeError = false;
    }
    if (this.arrivalDate.getTime() < this.minArrivalDate.getTime()) {
      this.invalidLessArrivalTimeError = true;
    } else {
      this.invalidLessArrivalTimeError = false;
    }
    // if (this.arrivalDate > this.departureDate) {
    //    this.invalidMoreArrivalTimeErrorDepart = true;
    // } else {
    //   this.invalidMoreArrivalTimeErrorDepart = false;
    // }

  }

  closeAttractionDialog() {
    this.dialogRef.close();
  }

  addAttraction() {
    this.navigatorService.activeTab = 'timeline';
    this.attractionData.arrival = this.arrivalDate.toString();
    this.attractionData.departure = this.departureDate.toString();

    this.dialogRef.close(this.attractionData);
  }

}
