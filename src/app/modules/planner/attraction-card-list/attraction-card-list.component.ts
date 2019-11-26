import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stop } from '@models/Stop';
import { Attraction } from '@models/Attraction';
import { TripService } from '@services/trip.service';
import { FormControl } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { FilterComponent } from '@planner/filter/filter.component';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-attraction-card-list',
  templateUrl: './attraction-card-list.component.html',
  styleUrls: ['./attraction-card-list.component.css']
})
export class AttractionCardListComponent implements OnInit {
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
  pagination: google.maps.places.PlaceSearchPagination;
  attractionType = 'tourist_attraction';
  displayMoreAttractionsLoader = false;

  @ViewChild('noAttractionsFound', { static: false })
  noAttractionsFoundElement: ElementRef;

  constructor(
    public tripService: TripService,
    private ngZone: NgZone,
    public dialog: MatDialog
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
        type: this.attractionType
      },
      (placeResults, status, pagination) => {
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
            imageUrl: environment.production ? placeResult.photos
              ? placeResult.photos[0].getUrl({
                  maxHeight: 200,
                  maxWidth: 200
                })
              : null : 'assets\\images\\attraction.jpg',
            arrival: '',
            departure: ''
          };
          attractions.push(attractionData);
        });
        // console.log(this.arrAttractions);
        this.ngZone.run(() => {
          this.arrAttractions = attractions;
          this.stopIdOfAttraction = stop.stopId;
          this.chosenCity = stop.name;
          if (this.arrAttractions.length === 0) {
            let displayText = `No attractions found at ${stop.name}. `;

            if (this.radius !== this.maxRadius) {
              displayText += 'Increasing the radius may help.';
            } else {
              displayText += 'Please check for other stops.';
            }

            (this.noAttractionsFoundElement
              .nativeElement as HTMLDivElement).innerText = displayText;
            if (
              !(this.noAttractionsFoundElement
                .nativeElement as HTMLDivElement).classList.contains(
                'no-attractions-found'
              )
            ) {
              (this.noAttractionsFoundElement
                .nativeElement as HTMLDivElement).classList.add(
                'no-attractions-found'
              );
            }
          } else {
            (this.noAttractionsFoundElement
              .nativeElement as HTMLDivElement).innerText = '';
            if (
              (this.noAttractionsFoundElement
                .nativeElement as HTMLDivElement).classList.contains(
                'no-attractions-found'
              )
            ) {
              (this.noAttractionsFoundElement
                .nativeElement as HTMLDivElement).classList.remove(
                'no-attractions-found'
              );
            }
          }
          this.pagination = pagination;
          this.displayLoader = false;
          this.displayMoreAttractionsLoader = false;
        });
      }
    );
  }

  getAttractionData(attractionDataApi) {
    const attractionData: Attraction = {
      placeId: attractionDataApi.attractionId,
      name: attractionDataApi.name,
      description: attractionDataApi.description,
      location: {
        latitude: attractionDataApi.location.lat,
        longitude: attractionDataApi.location.lng
      },
      rating: attractionDataApi.rating,
      imageUrl: attractionDataApi.imageUrl,
      arrival: '',
      departure: ''
    };
    return attractionData;
  }

  handleRadiusChange(event: Event) {
    this.radius = +(event.target as HTMLInputElement).value;
    this.attractionByStop(this.stop);
  }
  searchPlace(searchQuery: string) {
    this.searchQuery = searchQuery;
  }
  handleSearchBarOpen() {
    this.search.setValue('');
  }
  loadMoreAttractions() {
    if (this.pagination.hasNextPage && this.displayMoreAttractionsLoader === false) {
      this.displayMoreAttractionsLoader = true;
      this.pagination.nextPage();
    }
  }
  openFilterDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.height = '230px';

    dialogConfig.data = { attractionType: this.attractionType };
    const dialogRef = this.dialog.open(FilterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(attractionType => {
      if (attractionType) {
        this.attractionType = attractionType;
        this.attractionByStop(this.stop);
      }
    });
  }
}

