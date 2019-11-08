import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from "@angular/material/dialog";
import { TimePickerThemeService } from "../../../services/TimePickerTheme.service";
import { TripService } from "src/app/services/trip.service";
import { HttpClient } from "@angular/common/http";
import { Time } from "../../../models/Time";
import { Hotel } from "src/app/models/Hotel";

@Component({
  selector: "app-add-hotel-details",
  templateUrl: "./add-hotel-details.component.html",
  styleUrls: ["./add-hotel-details.component.css"]
})
export class AddHotelDetailsComponent implements OnInit {
  hotelData: Hotel;
  stopIdOfHotel: string;
  arrivalDate: Date;
  departureDate: Date;
  maxDepartureDate: Date;
  arrivalTime = "00:00 am";
  departureTime = "00:00 am" ;
  invalidDepartureTimeError: boolean;
  invalidArrivalTimeError:boolean;

  constructor(
    public dialogRef: MatDialogRef<AddHotelDetailsComponent>,
    public tripService: TripService,
    private http: HttpClient,
    public timePickerThemeService: TimePickerThemeService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    console.log(data);
    this.hotelData = data.hotelData;
    this.stopIdOfHotel = data.stopIdOfHotel;
  }
  ngOnInit() {
    this.arrivalDate = new Date(this.getMinDate());
    this.departureDate = new Date(this.getMinDate());
    this.maxDepartureDate = new Date(this.getMaxDate());
  }

  handleArrivalTimeSet(time: string) {
    //   date.getHours().toString() + ":" + date.getMinutes().toString() + " am";
    // console.log(this.arrivalTime);
    this.arrivalTime = time;
    const newarrivaltime = Time.parseTimeStringToTime(this.arrivalTime);
    this.arrivalDate.setHours(newarrivaltime.hours);
    this.arrivalDate.setMinutes(newarrivaltime.minutes);
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
      this.tripService.getStopByStopId(this.stopIdOfHotel).arrival
    );
  }
  getMaxDate() {
    return new Date(
      this.tripService.getStopByStopId(this.stopIdOfHotel).departure
    );
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
      this.invalidArrivalTimeError = true;
    } else {
      this.invalidArrivalTimeError = false;
    }
  }

  closeHotelDialog() {
    this.dialogRef.close();
  }

  addHotel() {
    this.hotelData.arrival = this.arrivalDate.toString();
    this.hotelData.departure = this.departureDate.toString();

    this.dialogRef.close(this.hotelData);
  }
}
