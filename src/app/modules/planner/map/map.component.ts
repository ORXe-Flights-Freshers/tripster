import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/Trip';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  isLoading: boolean;

  constructor(public tripService: TripService) {
    // console.log(this.tripService.trip);
    // this.isLoading = true;
  }
  origin;
  destination;
  markerOptions;
  stopIconUrl = 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png';

  ngOnInit() {
    this.markerOptions = {
      // origin: {
      //   // infoWindow: this.tripService.trip.source.name,
      //   icon: "http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png",
      //   label: "sabk"
      // },
      // waypoints: {
      //   infoWindow: "Way",
      //   icon: "http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png",
      //   label: "sabk"
      // },
      // destination: {
      //   // infoWindow: this.tripService.trip.destination.name
      //   icon: "http://maps.gstatic.com/mapfiles/markers2/marker_greenA.png",
      //   label: "sabk"
      // }
    };
    // this.tripService.tripSubject.pipe(take(1)).subscribe((trip: Trip) => {
    //   // this.tripService.updateWaypoints();
    //   this.origin = {
    //     lat: this.tripService.trip.source.location.latitude,
    //     lng: this.tripService.trip.source.location.longitude
    //   };
    //   this.destination = {
    //     lat: this.tripService.trip.destination.location.latitude,
    //     lng: this.tripService.trip.destination.location.longitude
    //   };

    // this.isLoading = false;
    // });
  }
}
