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
  arrivalTime = "00:00 am";
  departureTime = "11:00 am";
  timeTaken = 999;
  constructor(
    public dialogRef: MatDialogRef<AddHotelDetailsComponent>,
    public tripService: TripService,
    private http: HttpClient,
    public timePickerThemeService: TimePickerThemeService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    console.log(data);
    this.hotelData = data.hotelData;
    this.stopIdOfHotel = data.stopId;
  }
  ngOnInit() {
    this.arrivalDate = this.getMinDate();
    this.departureDate = this.arrivalDate;
  }

  handleArrivalTimeSet(time: string) {
    // this.arrivalTime =
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
