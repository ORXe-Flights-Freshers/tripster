import {Component} from '@angular/core';
import {TripService} from '@services/trip.service';
import {AgmInfoWindow, AgmMap} from '@agm/core';
import { mapStyle } from './mapStyle';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  constructor(public tripService: TripService) {
  }
  isLoading: boolean;
  map: google.maps.Map;
  placeIconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

  markerOptions;
  minZoom = 4;
  maxZoom = 16;
  stopIconUrl = 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png';
  style = mapStyle;

  mapReady(event) {
    this.map = event;
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('center'));
  }

  showPlaceInfoWindow(placeInfoWindow: AgmInfoWindow) {
    placeInfoWindow.open();
  }

  hidePlaceInfoWindow(placeInfoWindow: AgmInfoWindow) {
    placeInfoWindow.close();
  }

  handleZoomChange(zoom: number) {
    this.tripService.mapZoom = zoom;
  }

  showRoute(agmMap: AgmMap) {
    console.log('dsfd');
    agmMap.triggerResize(true);
  }
  openPlaceLink(placeId, placeName) {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = 'https://www.google.com/maps/search/?api=1&query=' + placeName + '&query_place_id=' + placeId;
    link.setAttribute('visibility', 'hidden');
    link.click();
    link.remove();
  }
}
