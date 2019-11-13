import { Component, OnInit } from '@angular/core';
import { TripService } from '@services/trip.service';
import { AgmInfoWindow } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  isLoading: boolean;

  constructor(public tripService: TripService) {}
  markerOptions;
  stopIconUrl = 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png';

  ngOnInit() {}
  showPlaceInfoWindow(placeInfoWindow: AgmInfoWindow) {
    placeInfoWindow.open();
  }

  hidePlaceInfoWindow(placeInfoWindow: AgmInfoWindow) {
    placeInfoWindow.close();
  }
}
