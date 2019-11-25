import { LoginService } from '@services/login.service';
import {ChangeDetectorRef, Component, OnInit, Input, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Time} from '@models/Time';
import {TripService} from '@services/trip.service';
import {Router} from '@angular/router';
import {Trip} from '@models/Trip';
import {TimePickerThemeService} from '@services/TimePickerTheme.service';
import { PopularTrip } from '@models/PopularTrip';
import { Subscription } from 'rxjs';
import { PopularTripService } from '@services/popular-trip.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  origin: google.maps.places.PlaceResult;
  destination: google.maps.places.PlaceResult;
  sourceValid: boolean;
  destinationValid: boolean;
  isDuplicatePlace: boolean;
  currentDate = new Date(Date.now());
  tripDate: Date = new Date(Date.now());
  tripTime =
    this.tripDate.getHours().toString() +
    ':' +
    this.tripDate.getMinutes().toString() +
    ' am';
  vehicleMileage = 22;
  invalidDepartureDateTimeError: boolean;
  minTime: Date;

  popularTripSubscription: Subscription;
  sourceName = '';
  destinationName = '';
  placeService: google.maps.places.PlacesService;

  searchForm = new FormGroup({
    mileage: new FormControl(this.vehicleMileage, [
      Validators.pattern('^[1-9]+[0-9]*$'),
    ]),
  });

  constructor(private tripService: TripService,
              private router: Router,
              public timePickerThemeService: TimePickerThemeService,
              private changeDetectRef: ChangeDetectorRef,
              private loginService: LoginService,
              public popularTripService: PopularTripService) {
  }

@Input() popularTrip: PopularTrip;

  ngOnInit() {
    this.minTime = this.getMinTime();

    this.popularTripSubscription =
        this.popularTripService.popularTripSubject
                  .subscribe((trip: PopularTrip) => {
                    this.setGooglePlacesObjectByPopularTrip(trip);
                    this.sourceValid = true; this.destinationValid = true; this. isDuplicatePlace = false;
                  });

  }

  ngOnDestroy() {
    this.popularTripSubscription.unsubscribe();
  }

  handleInvalidSource(event) {
    this.sourceValid = event.isValid;
  }

  handleInvalidDestination(event) {
    this.destinationValid = event.isValid;
  }

  handleSourceChange(place: google.maps.places.PlaceResult) {
    this.origin = place;
    this.checkForDuplicatePlace();
  }

  handleDestinationChange(place: google.maps.places.PlaceResult) {
    this.destination = place;
    this.checkForDuplicatePlace();
  }

  handleTimeSet(time: string) {
    this.tripTime = time;
    this.setTripDateTime();
    this.validateDateTime();
  }

  handleDateSet(date) {
    this.tripDate = new Date(date.value);
    this.setTripDateTime();
    this.minTime = this.getMinTime();
    this.validateDateTime();
  }

  validateDateTime() {
    this.invalidDepartureDateTimeError = this.tripDate.getTime() < new Date(Date.now()).setSeconds(0);
  }

  setTripDateTime() {
    const newTripTime = Time.parseTimeStringToTime(this.tripTime);
    this.tripDate.setHours(newTripTime.hours);
    this.tripDate.setMinutes(newTripTime.minutes);
  }

  getMinDate() {
    return new Date(Date.now());
  }

  getMinTime() {
    if (this.isDepartureDateMore()) {
      return new Date(new Date(this.currentDate).setHours(0, 0));
    }
    return new Date(this.currentDate);
  }

  isDepartureDateMore(): boolean {
    if (this.tripDate.getFullYear() > this.currentDate.getFullYear()) {
      return true;
    }
    if (this.tripDate.getMonth() > this.currentDate.getMonth()) {
      return true;
    }
    return this.tripDate.getDate() > this.currentDate.getDate();
  }

  checkForDuplicatePlace() {
    if (this.origin === undefined || this.destination === undefined) {
      return;
    }
    this.isDuplicatePlace = this.origin.place_id === this.destination.place_id;
    this.changeDetectRef.detectChanges();
  }

  setGooglePlacesObjectByPopularTrip(trip: PopularTrip) {

    const request = {
      placeId: trip.source.stopId,
      sessionToken: new google.maps.places.AutocompleteSessionToken(),
      fields: [
        'name',
        'geometry',
        'formatted_address',
        'icon',
        'permanently_closed',
        'photos',
        'place_id',
        'plus_code',
        'types',
        'address_component',
        'adr_address',
        'vicinity',
        'url'
      ]
    };
    this.placeService = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    this.placeService.getDetails(request, place => {
    this.origin = place;
    });
    request.placeId = trip.destination.stopId;
    this.placeService.getDetails(request, place => {
      this.handleDestinationChange(place);
      this.destination = place;
    });
    this.sourceName = trip.source.name;
    this.destinationName = trip.destination.name;

  }

  onSubmit() {
    const time = Time.parseTimeStringToTime(this.tripTime);
    this.tripDate.setHours(time.hours);
    this.tripDate.setMinutes(time.minutes);
    const trip = this.generateTrip();

    this.tripService.createTrip(trip).subscribe(data => {
      this.router.navigate(['/', 'planner', (data as Trip).id]).then();
    });
  }

  generateTrip(): Trip {
    let trip: Trip;
    trip = {
      userId: this.loginService.loggedIn ? this.loginService.user.userId : '',
      source: {
        location: {
          latitude: this.origin.geometry.location.lat(),
          longitude: this.origin.geometry.location.lng(),
        },
        stopId: this.origin.place_id,
        name: this.origin.name,
        arrival: this.tripDate.toString(),
        departure: this.tripDate.toString(),
        hotels: [],
        attractions: [],
      },
      destination: {
        location: {
          latitude: this.destination.geometry.location.lat(),
          longitude: this.destination.geometry.location.lng(),
        },
        stopId: this.destination.place_id,
        name: this.destination.name,
        arrival: this.tripDate.toString(),
        departure: 'Mon Nov 13 2090 11:37:09 GMT+0530 (India Standard Time)',
        hotels: [],
        attractions: [],
      },
      stops: [],
      mileage: this.vehicleMileage,
    };
    return trip;
  }

  onMileageChange($event: Event) {
    this.vehicleMileage = +($event.target as HTMLInputElement).value;
  }
}
