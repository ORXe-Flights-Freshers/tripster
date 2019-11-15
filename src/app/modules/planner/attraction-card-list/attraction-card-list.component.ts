import {Component, OnInit, ChangeDetectorRef, NgZone, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stop } from '@models/Stop';
import { Attraction } from '@models/Attraction';
import { TripService } from '@services/trip.service';
import { FormControl } from '@angular/forms';
import { MatSearchBarComponent } from 'ng-mat-search-bar/src/app/ng-mat-search-bar/mat-search-bar/mat-search-bar.component';


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
export class AttractionCardListComponent implements OnInit, AfterViewInit {
  arrAttractions: Attraction[] = [];
  stopIdOfAttraction: string;
  chosenCity: string;
  displayLoader: boolean;
  placeService: google.maps.places.PlacesService;
  stop: Stop;
  radius = 2;
  maxRadius = 10;
  search: FormControl = new FormControl('');
  searchQuery = '';

  @ViewChild('noAttractionsFound', { static: false }) noAttractionsFoundElement: ElementRef;

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
    this.search.valueChanges.subscribe(val => this.searchPlace(val));
  }

  ngAfterViewInit() {

  }

  attractionByStop(stop: Stop) {
    this.displayLoader = true;
    this.stop = stop;
    this.placeService = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    this.arrAttractions = [];
    const attractions = [];
    this.placeService.nearbySearch(
      {
        location: { lat: stop.location.latitude, lng: stop.location.longitude },
        radius: +this.radius * 1000,
        type: 'tourist_attraction'
      },
      (placeResults, status, pagination) => {
          console.log('triggered');
          placeResults.forEach(placeResult => {
          const attractionData = {
            name: placeResult.name,
            placeId: placeResult.place_id,
            description: placeResult.vicinity,
            rating: placeResult.rating,
            location: {
              latitude: placeResult.geometry.location.lat(),
              longitude: placeResult.geometry.location.lng()
            },
            imageUrl: placeResult.photos ? placeResult.photos[0].getUrl({
              maxHeight: 200,
              maxWidth: 200
            }) : 'http://lorempixel.com/200/200/nature/?id=' + Math.random(),
            arrival: '',
            departure: ''
          };
          attractions.push(attractionData);
          });
          console.log(this.arrAttractions);
          this.arrAttractions = attractions;
          this.displayLoader = false;
          this.stopIdOfAttraction = stop.stopId;
          this.chosenCity = stop.name;
          if (this.arrAttractions.length === 0) {
            let displayText = `No attractions found at ${stop.name}. `;

            if (this.radius !== this.maxRadius) {
              displayText += 'Increasing the radius may help.';
            } else {
              displayText += 'Please check for other stops.';
            }

            (this.noAttractionsFoundElement.nativeElement as HTMLDivElement).innerText = displayText;
            if (!(this.noAttractionsFoundElement.nativeElement as HTMLDivElement)
              .classList.contains('no-attractions-found')) {
              (this.noAttractionsFoundElement.nativeElement as HTMLDivElement)
                .classList.add('no-attractions-found');
            }
          } else {
            (this.noAttractionsFoundElement.nativeElement as HTMLDivElement).innerText = '';
            if ((this.noAttractionsFoundElement.nativeElement as HTMLDivElement)
              .classList.contains('no-attractions-found')) {
              (this.noAttractionsFoundElement.nativeElement as HTMLDivElement)
                .classList.remove('no-attractions-found');
            }
          }
          if (pagination.hasNextPage) {
            pagination.nextPage();
          }
        });

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
    searchPlace(searchQuery: string) {
      this.searchQuery = searchQuery;
    }
    handleSearchBarOpen() {
      this.search.setValue('');
    }
  }

