import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stop } from '@models/Stop';
import { Attraction } from '@models/Attraction';
import { TripService } from '@services/trip.service';


interface AttractionResult {
  attractionId: string;
  name: string;
  description: string;
  imageUrl: string;
  location: {
    lat: number,
    lng: number
  };
  rating: number;
}

@Component({
  selector: 'app-attraction-card-list',
  templateUrl: './attraction-card-list.component.html',
  styleUrls: ['./attraction-card-list.component.css']
})
export class AttractionCardListComponent implements OnInit {
  arrAttractions = [];
  stopIdOfAttraction: string;
  chosenCity: string;
  displayLoader: boolean;
  placeService: google.maps.places.PlacesService;
  stop: Stop;
  radius = 2;

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
    this.stop = stop;
    this.placeService = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    this.arrAttractions = [];
    this.placeService.nearbySearch(
      {
        location: { lat: stop.location.latitude, lng: stop.location.longitude },
        radius: +this.radius * 1000,
        type: 'tourist_attraction'
      },
      (placeResults, status, pagination) => {
        placeResults.forEach(placeResult => {
          const attractionData = this.getAttractionData({
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
            }) : ''
          });
          this.arrAttractions.push(attractionData);
        });
        this.stopIdOfAttraction = stop.stopId;
        this.chosenCity = stop.name;
        this.displayLoader = false;
        this.changeDetectorRef.detectChanges();
        if (pagination.hasNextPage) {
          pagination.nextPage();
        }
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

    handleRadiusChange(event: Event) {
      this.radius = +(event.target as HTMLInputElement).value;
      console.log(`Radius: ${this.radius}`);
      this.attractionByStop(this.stop);
    }
  }

