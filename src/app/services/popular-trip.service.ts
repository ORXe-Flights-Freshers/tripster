import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PopularTrip } from '@models/PopularTrip';


@Injectable({
  providedIn: 'root'
})
export class PopularTripService {
  placeService: google.maps.places.PlacesService;

  popularTripSubject = new Subject<PopularTrip>();

  constructor(private http: HttpClient) { }

  setPopularTrip(trip: PopularTrip) {
    this.popularTripSubject.next(trip);
  }
}
