import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TimePickerThemeService} from '@services/TimePickerTheme.service';
import {TripService} from '@services/trip.service';
import {HttpClient} from '@angular/common/http';
import {Time} from '@models/Time';
import {Hotel} from '@models/Hotel';
import {NavigatorService} from '@services/navigator.service';

@Component({
  selector: 'app-add-hotel-details',
  templateUrl: './add-hotel-details.component.html',
  styleUrls: ['./add-hotel-details.component.css']
})
export class AddHotelDetailsComponent implements OnInit {
  hotelData: Hotel;
  stopIdOfHotel: string;
  arrivalDate: Date;
  departureDate: Date;
  maxDepartureDate: Date;
  arrivalTime = '00:00 am';
  departureTime = '00:00 am';
  invalidDepartureTimeError: boolean;
  invalidArrivalTimeError: boolean;
  invalidSameTimeError: boolean;
  minTime: Date;
  maxTime: Date;

  constructor(
    public dialogRef: MatDialogRef<AddHotelDetailsComponent>,
    public tripService: TripService,
    public navigatorService: NavigatorService,
    private http: HttpClient,
    public timePickerThemeService: TimePickerThemeService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.hotelData = data.hotelData;
    this.stopIdOfHotel = data.stopIdOfHotel;
  }

  ngOnInit() {
    this.arrivalDate = new Date(this.getMinDate());
    const stop = this.tripService.getStopByStopId(this.stopIdOfHotel);
    if (stop.stopId === this.tripService.trip.destination.stopId) {
      this.departureDate = new Date(this.arrivalDate);
    } else {
      this.departureDate = new Date(this.getMaxDate());
    }
    this.arrivalTime = this.arrivalDate.getHours().toString() +
      ':' + this.arrivalDate.getMinutes().toString() + ' am';
    this.departureTime = this.departureDate.getHours().toString() +
      ':' + this.departureDate.getMinutes().toString() + ' am';
    this.maxDepartureDate = new Date(this.getMaxDate()); // departure of stop
    this.minTime = this.getMinTime();
    this.maxTime = this.getMaxTime();
  }


  handleDepartureTimeSet(time: string) {
    this.departureTime = time;
    const newDepartureTime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDepartureTime.hours);
    this.departureDate.setMinutes(newDepartureTime.minutes);
    this.validateDateTime();
  }

  getMinDate(): Date {
    const stop = this.tripService.getStopByStopId(this.stopIdOfHotel);
    if (stop.hotels.length === 0) {
      return new Date(stop.arrival);
    } else {
      return new Date(stop.hotels[stop.hotels.length - 1].departure);
    }
  }

  getMaxDate(): Date {
    return new Date(
      this.tripService.getStopByStopId(this.stopIdOfHotel).departure
    );
  }

  getMinTime(): Date {
    if (this.isDepartureDateMore()) { // enables timepicker
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
    if (this.departureDate.getDate() > this.arrivalDate.getDate()) {
      return true;
    }
    return false;

  }

  getMaxTime(): Date {
    return new Date((new Date(this.maxDepartureDate)).setHours(23, 59));
  }

  isDepartureDateSame(): boolean { // compare with maxDepartureDate
    if (this.departureDate.getDate() === this.maxDepartureDate.getDate()) {
      return true;
    }
    return false;
  }

  handleDepartureDateSet(date: HTMLInputElement) {
    this.departureDate = new Date(date.value);
    const newDepartureTime = Time.parseTimeStringToTime(this.departureTime);
    this.departureDate.setHours(newDepartureTime.hours);
    this.departureDate.setMinutes(newDepartureTime.minutes);
    this.minTime = this.getMinTime();
    this.maxTime = this.getMaxTime();
    this.validateDateTime();
  }

  validateDateTime() {
    this.invalidArrivalTimeError = this.departureDate < this.arrivalDate;
    this.invalidDepartureTimeError = this.departureDate > this.maxDepartureDate;
    this.invalidSameTimeError = this.departureDate.getTime() === this.arrivalDate.getTime();
  }

  closeHotelDialog() {
    this.dialogRef.close();
  }

  addHotel() {
    this.navigatorService.activeTabSubject.next('timeline');
    this.hotelData.arrival = this.arrivalDate.toString();
    this.hotelData.departure = this.departureDate.toString();
    this.tripService.addHotelToTrip(this.hotelData, this.stopIdOfHotel);
    this.dialogRef.close('success');
  }
}
