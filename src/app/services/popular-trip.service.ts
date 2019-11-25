import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PopularTripService {
  placeService: google.maps.places.PlacesService;

  constructor(private http: HttpClient) { }

  getPlaceImageUrl(lat: number, lng: number): string {
    return '';
  }
}
