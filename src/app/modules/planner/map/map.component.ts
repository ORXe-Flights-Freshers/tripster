import { Component, OnInit, SimpleChange } from '@angular/core';
import { TripService } from '@services/trip.service';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import {AgmInfoWindow, AgmCoreModule, AgmMap} from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  isLoading: boolean;
  map: google.maps.Map
  placeIconUrl:string="http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  constructor(public tripService: TripService) {}
  markerOptions;
  minZoom=4;
  maxZoom=16;
  stopIconUrl = 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png';

  mapReady(event)
  {
    this.map=event;
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('center'));
  }

  ngOnInit() {}
  showPlaceInfoWindow(placeInfoWindow: AgmInfoWindow) {
    placeInfoWindow.open();
  }

  hidePlaceInfoWindow(placeInfoWindow: AgmInfoWindow) {
    placeInfoWindow.close();
  }
  handleZoomChange(zoom:number){
    this.tripService.mapZoom = zoom;
  }
  showRoute(agmMap:AgmMap)
  {
    console.log("dsfd");
    agmMap.triggerResize(true);
  }
}
