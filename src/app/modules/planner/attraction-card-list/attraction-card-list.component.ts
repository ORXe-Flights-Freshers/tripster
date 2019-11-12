import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stop } from 'src/app/models/Stop';
import { Attraction } from 'src/app/models/Attraction';
import { TripService } from 'src/app/services/trip.service';


interface AttractionResult {
  name: string;
  attractionId: string;
  description: string;
  rating: number;
  imageUrl: string;
  location: {
    lat: number,
    lng: number
  };
}

@Component({
  selector: 'app-attraction-card-list',
  templateUrl: './attraction-card-list.component.html',
  styleUrls: ['./attraction-card-list.component.css']
})
export class AttractionCardListComponent implements OnInit {
  arrAttractions: AttractionResult[] = [];
  stopIdOfAttraction: string;
  chosenCity: string;
  displayLoader: boolean;
  placeService: google.maps.places.PlacesService;

  constructor(
    private httpService: HttpClient,
    public tripService: TripService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.displayLoader = false;
  }
  ngOnInit() {
    if (this.tripService.trip.stops.length === 0) {
      this.attractionByStop(this.tripService.trip.destination);
    } else {
      this.attractionByStop(this.tripService.trip.stops[0]);
    }
  }
  attractionByStop(stop: Stop) {
    this.displayLoader = true;
    this.placeService = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    this.placeService.nearbySearch(
      {
        location: { lat: stop.location.latitude, lng: stop.location.longitude },
        radius: 2000,
        type: 'tourist_attraction'
      },
      placeResults => {
        this.arrAttractions = [];
        placeResults.forEach(placeResult => {
          this.arrAttractions.push({
            name: placeResult.name,
            attractionId: placeResult.place_id,
            description: placeResult.vicinity,
            rating: placeResult.rating,
            location: {
              lat: placeResult.geometry.location.lat(),
              lng: placeResult.geometry.location.lng()
            },
            imageUrl: placeResult.photos ? placeResult.photos[0].getUrl({
              maxHeight: 200,
              maxWidth: 200
            }) : 'http://lorempixel.com/200/200/nature/?id=' + Math.random()
          });
        });
        this.stopIdOfAttraction = stop.stopId;
        this.chosenCity = stop.name;
        this.displayLoader = false;
        this.changeDetectorRef.detectChanges();
      }
    );
  }


  getAttractionData(attractionDataApi: AttractionResult) {

      const attractionData: Attraction = {
        placeId: attractionDataApi.attractionId,
        name: attractionDataApi.name,
        description: attractionDataApi.description,
        location: {
          latitude: attractionDataApi.location.lat,
          longitude: attractionDataApi.location.lng
        },
        rating: attractionDataApi.rating,
        imageUrl: attractionDataApi.imageUrl ,
        arrival: '',
        departure: ''
      };
      return attractionData;
    }
  }

