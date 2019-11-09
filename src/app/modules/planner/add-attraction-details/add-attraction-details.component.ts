import { Component, OnInit ,Inject} from '@angular/core';
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
  maxDepartureDate: Date;
  arrivalTime = "00:00 am";
  departureTime = "00:00 am" ;
  invalidDepartureTimeError: boolean;
  invalidArrivalTimeError:boolean;
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
    this.maxDepartureDate = new Date(this.getMaxDate());
  }

  handleArrivalTimeSet(time: string) {
    //   date.getHours().toString() + ":" + date.getMinutes().toString() + " am";
    // console.log(this.arrivalTime);
    this.arrivalTime = time;
    const newArrivalTime = Time.parseTimeStringToTime(this.arrivalTime);
    this.arrivalDate.setHours(newArrivalTime.hours);
    this.arrivalDate.setMinutes(newArrivalTime.minutes);
    // if (this.arrivalDate.getTime() > this.departureDate.getTime())
    //   this.departureDate = this.arrivalDate;
  }
  handleDepartureTimeSet(time: string) {

    this.departureTime = time;
    const newdeparturetime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newdeparturetime.hours);
    this.departureDate.setMinutes(newdeparturetime.minutes);
    if (this.departureDate < this.arrivalDate) {
      this.invalidArrivalTimeError = true;
    } else {
      this.invalidArrivalTimeError = false;
    }
    if (this.departureDate > this.maxDepartureDate) {
      this.invalidDepartureTimeError = true;
    } else {
      this.invalidDepartureTimeError = false;
    }

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
    console.log(this.arrivalDate);
  }
  handleDepartureDateSet(date) {
    this.departureDate = new Date(date.value);
    if (this.departureTime === '00:00 am' ) {
     this.departureTime = this.departureDate.getHours().toString() +
        ':' +  this.departureDate.getMinutes().toString() + ' am';
    }
    const newDeparturetime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDeparturetime.hours);
    this.departureDate.setMinutes(newDeparturetime.minutes);
    if (this.departureDate < this.arrivalDate) {
      this.invalidArrivalTimeError = true;
    } else {
      this.invalidArrivalTimeError = false;
    }
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
