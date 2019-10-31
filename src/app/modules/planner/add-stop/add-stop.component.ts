import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material/dialog';
import {TimePickerThemeService} from '../../../services/TimePickerTheme.service';
import { TripService } from "src/app/services/trip.service";
import { HttpClient } from "@angular/common/http";
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';

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
              public tripService: TripService,
              private http: HttpClient,
              public timePickerThemeService: TimePickerThemeService) { }

  ngOnInit() {}

  handleStopPlaceChange(place: google.maps.places.PlaceResult) {
    this.stopCity = place;
    console.log(place);
     let previousLocation=this.tripService.getPreviousLocation();
    //  let startPoint={lat:999,lng:999};
    //  let endPoint={lat:999,lng:999};
    //  startPoint.lat=previousLocation.location.latitude;
    //  startPoint.lng=previousLocation.location.longitude;
    //  endPoint.lat=place.geometry.location.lat();
    //  endPoint.lng=place.geometry.location.lng();    
    //  console.log(startPoint);
    //  console.log("qwqwqwqwqwqwq");
    //  console.log(endPoint);
    //  let travelTime;
    //  const key ='AIzaSyC2LnC7a1z5MDzBjx4Us9qo9Z4Yupum03A' ;
    //  this.http.get("http://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+ startPoint.lat+","+startPoint.lng+"&destinations="+endPoint.lat+","+endPoint.lng+"&key="+ key).subscribe(data => {
    //    console.log(data);
    //  });
    var startPoint = new google.maps.LatLng(previousLocation.location.latitude, previousLocation.location.longitude);
    var endPoint = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
    
    var distanceMatrixService = new google.maps.DistanceMatrixService();
    distanceMatrixService.getDistanceMatrix(
      {
        origins: [startPoint],
        destinations: [endPoint],
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, callback);
    
    function callback(response, status) {
      // See Parsing the Results for
      // the basics of a callback function.
      console.log(response);
    }


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
