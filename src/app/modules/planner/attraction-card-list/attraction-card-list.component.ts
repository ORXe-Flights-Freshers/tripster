import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Stop } from "src/app/models/Stop";
import { TripService } from "src/app/services/trip.service";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: "app-attraction-card-list",
  templateUrl: "./attraction-card-list.component.html",
  styleUrls: ["./attraction-card-list.component.css"]
})
export class AttractionCardListComponent implements OnInit {
  arrAttractions = [];
  chosenCity: string;
  displayLoader: boolean;
  placeService: google.maps.places.PlacesService;

  constructor(
    private httpService: HttpClient,
    public tripService: TripService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    console.log(tripService.trip);
    this.displayLoader = false;
  }
  ngOnInit() {
    this.attractionByStop(this.tripService.trip.source);
  }
  attractionByStop(stop: Stop) {
    this.displayLoader = true;
    this.placeService = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    this.placeService.nearbySearch(
      {
        location: { lat: stop.location.latitude, lng: stop.location.longitude },
        radius: 2000,
        type: "tourist_attraction"
      },
      placeResults => {
        this.arrAttractions = [];
        placeResults.forEach(placeResult => {
          this.arrAttractions.push({
            name: placeResult.name,
            attractionId: placeResult.place_id,
            description: placeResult.vicinity,
            rating: placeResult.rating
            // imageUrl: placeResult.photos[0].getUrl({})
          });
        });
        this.chosenCity = stop.name;
        this.displayLoader = false;
        this.changeDetectorRef.detectChanges();
        console.log(placeResults);
      }
    );
  }
}
