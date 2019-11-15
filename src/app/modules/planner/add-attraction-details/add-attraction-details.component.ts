import { Component, OnInit , Inject} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { TimePickerThemeService } from '@services/TimePickerTheme.service';
import { TripService } from '@services/trip.service';
import { HttpClient } from '@angular/common/http';
import { Time } from '@models/Time';
import { Attraction } from '@models/Attraction';
import { NavigatorService } from '@services/navigator.service';
import { MatDatepickerInputEvent } from '@angular/material';

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
  stopArrivalDate: Date;
  stopDepartureDate: Date;
  arrivalTime = '00:00 am';
  departureTime = '00:00 am' ;
  invalidDepartureTimeError: boolean;
  invalidMoreArrivalTimeError: boolean;
  invalidLessArrivalTimeError: boolean;
  minArrivalTime: Date;
  tempDate = '11/12/2019';
  // invalidMoreArrivalTimeErrorDepart: boolean;
  constructor(
    public dialogRef: MatDialogRef<AddAttractionDetailsComponent>,
    public tripService: TripService,
    public navigatorService: NavigatorService,
    private http: HttpClient,
    public timePickerThemeService: TimePickerThemeService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
      this.attractionData = data.attractionData;
      this.stopIdOfAttraction = data.stopIdOfAttraction;
  }

  ngOnInit() {
    this.arrivalDate = new Date(this.getMinDate());
    const stop = this.tripService.getStopByStopId(this.stopIdOfAttraction);
    if (stop.stopId === this.tripService.trip.destination.stopId) {
      this.departureDate = new Date(this.arrivalDate);
    } else {
      this.departureDate = new Date(this.getMaxDate());
    }
    this.departureTime = this.departureDate.getHours().toString() +
        ':' +  this.departureDate.getMinutes().toString() + ' am';
    this.arrivalTime = this.arrivalDate.getHours().toString() +
        ':' +  this.arrivalDate.getMinutes().toString() + ' am';
    this.stopDepartureDate = new Date(this.getMaxDate());
    this.stopArrivalDate = new Date(this.getMinDate());
    this.minArrivalTime = this.getMinArrivalTime();
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
    const newDepartureTime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDepartureTime.hours);
    this.departureDate.setMinutes(newDepartureTime.minutes);
    this.validateDateTime();
  }
  getMinDate(): Date {
    return new Date(
      this.tripService.getStopByStopId(this.stopIdOfAttraction).arrival
    );
  }
  getMaxDate(): Date {
    return new Date(
      this.tripService.getStopByStopId(this.stopIdOfAttraction).departure
    );
  }
  handleArrivalDateSet(date: MatDatepickerInputEvent<Date>) {
    this.arrivalDate = new Date(date.value);
    const newArrivalTime = Time.parseTimeStringToTime(this.arrivalTime);
    this.arrivalDate.setHours(newArrivalTime.hours);
    this.arrivalDate.setMinutes(newArrivalTime.minutes);
    this.minArrivalTime = this.getMinArrivalTime();
    this.validateDateTime();
  }
  handleDepartureDateSet(date: MatDatepickerInputEvent<Date>) {
    this.departureDate = new Date(date.value);
    const newDepartureTime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDepartureTime.hours);
    this.departureDate.setMinutes(newDepartureTime.minutes);
    this.validateDateTime();
  }

  validateDateTime() {
    this.invalidMoreArrivalTimeError = this.departureDate < this.arrivalDate;
    this.invalidDepartureTimeError = this.departureDate > this.stopDepartureDate;
    this.invalidLessArrivalTimeError = this.arrivalDate.getTime() < this.stopArrivalDate.getTime();
  }

  getMinArrivalTime(): Date {
    if ( this.isArrivalDateMore()) { // enables timepicker
      return new Date((new Date(this.arrivalDate)).setHours(0 , 0));
   }
    return new Date(this.arrivalDate);
  }

  isArrivalDateMore(): boolean {
    if (this.arrivalDate.getFullYear() > this.stopArrivalDate.getFullYear() ) {
      return true;
    }
    if (this.arrivalDate.getMonth() > this.stopArrivalDate.getMonth() ) {
      return true;
    }
    return this.arrivalDate.getDate() > this.stopArrivalDate.getDate();
  }

  getMinDepartureTime(): Date {
    if ( this.isDepartureDateMore()) { // enables timepicker
      return new Date((new Date(this.departureDate)).setHours(0 , 0));
   }
    return new Date(this.departureDate);
  }

  isDepartureDateMore(): boolean {
    if (this.arrivalDate.getFullYear() > this.stopArrivalDate.getFullYear() ) {
      return true;
    }
    if (this.arrivalDate.getMonth() > this.stopArrivalDate.getMonth() ) {
      return true;
    }
    return this.arrivalDate.getDate() > this.stopArrivalDate.getDate();
  }

  closeAttractionDialog() {
    this.tripService.updateTimeline();
    this.dialogRef.close();
  }

  addAttraction() {
    this.navigatorService.activeTab = 'timeline';
    this.attractionData.arrival = this.arrivalDate.toString();
    this.attractionData.departure = this.departureDate.toString();

    this.dialogRef.close(this.attractionData);
  }
  toggleDatepicker(datepicker) {
    console.log(datepicker);
    if (datepicker.opened) {
        datepicker.close();
    } else {
      datepicker.open();
    }
  }

}
