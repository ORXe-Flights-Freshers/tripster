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
import {NavigatorService} from '@services/navigator.service';

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
  arrivalTime = '00:00 am';
  departureTime = '00:00 am' ;
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
      this.attractionData = data.attractionData;
      this.stopIdOfAttraction = data.stopIdOfAttraction;
  }

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
    const newDepartureTime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDepartureTime.hours);
    this.departureDate.setMinutes(newDepartureTime.minutes);
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
    const newArrivalTime = Time.parseTimeStringToTime(this.arrivalTime);
    this.arrivalDate.setHours(newArrivalTime.hours);
    this.arrivalDate.setMinutes(newArrivalTime.minutes);
    this.validateDateTime();
  }
  handleDepartureDateSet(date) {
    this.departureDate = new Date(date.value);
    const newDepartureTime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDepartureTime.hours);
    this.departureDate.setMinutes(newDepartureTime.minutes);
    this.validateDateTime();
  }

  validateDateTime() {
    this.invalidMoreArrivalTimeError = this.departureDate < this.arrivalDate;
    this.invalidDepartureTimeError = this.departureDate > this.maxDepartureDate;
    this.invalidLessArrivalTimeError = this.arrivalDate.getTime() < this.minArrivalDate.getTime();
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

}
