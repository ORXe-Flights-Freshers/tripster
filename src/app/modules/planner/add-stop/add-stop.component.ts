import { Component, OnInit } from '@angular/core';


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
  constructor() { }

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
  }
  handleDepartureDateSet(date) {
    this.departureDate = new Date(date.value);
  }
}
