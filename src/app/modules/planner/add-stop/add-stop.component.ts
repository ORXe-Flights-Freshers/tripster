import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';


@Component({
  selector: 'app-add-stop',
  templateUrl: './add-stop.component.html',
  styleUrls: ['./add-stop.component.css']
})


export class AddStopComponent implements OnInit {

  arrivalDate: Date = new Date(Date.now());
  departureDate: Date = new Date(Date.now());
  arrivalTime: String = "11:00 am";
  departureTime: String = "11:00 am";
  constructor(public dialogRef: MatDialogRef<AddStopComponent>) { }

  ngOnInit() {}
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
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
