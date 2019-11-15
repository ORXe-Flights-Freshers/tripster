import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Time } from '@models/Time';
import { TripService } from '@services/trip.service';
import { Router } from '@angular/router';
import { Trip } from '@models/Trip';
import {TimePickerThemeService} from '@services/TimePickerTheme.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  origin: google.maps.places.PlaceResult;
  destination: google.maps.places.PlaceResult;
  sourceValid: boolean;
  destinationValid: boolean;
  isDuplicatePlace: boolean;
  currentDate = new Date(Date.now());
  tripDate: Date = new Date(Date.now());
  tripTime = this.tripDate.getHours().toString() +
    ':' +  this.tripDate.getMinutes().toString() + ' am';
  vehicleMileage = 22;
  invalidDepartureDateTimeError: boolean;
  minTime: Date;

  searchForm = new FormGroup({
    mileage: new FormControl(this.vehicleMileage, [
      Validators.pattern('^[1-9]+[0-9]*$')
    ])
  });

  constructor(private tripService: TripService,
              private router: Router,
              public timePickerThemeService: TimePickerThemeService,
              private changeDetectRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.minTime = this.getMinTime();
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
    console.log(this.invalidDepartureDateTimeError);
    console.log(this.tripDate);

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
    if ( this.isDepartureDateMore()) {
      return new Date((new Date(this.currentDate)).setHours(0 , 0));
    }
    return new Date(this.currentDate);
  }

  isDepartureDateMore(): boolean {
    if (this.tripDate.getFullYear() > this.currentDate.getFullYear() ) {
      return true;
    }
    if (this.tripDate.getMonth() > this.currentDate.getMonth() ) {
      return true;
    }
    if (this.tripDate.getDate() > this.currentDate.getDate()  ) {
      return true;
    }
    return false;
  }

  checkForDuplicatePlace() {
    if (this.origin === undefined || this.destination === undefined) {
      return;
    }
    if (this.origin.place_id === this.destination.place_id) {
      console.log('matched');
      this.isDuplicatePlace = true;
    } else {
      this.isDuplicatePlace = false;
    }
    this.changeDetectRef.detectChanges();
  }

  onSubmit() {
    const time = Time.parseTimeStringToTime(this.tripTime);
    this.tripDate.setHours(time.hours);
    this.tripDate.setMinutes(time.minutes);
    const trip = this.generateTrip();
    this.tripService.displayTimeline = false;

    console.log(trip);
    this.tripService.createTrip(trip).subscribe(data => {
      console.log(data);
      this.tripService.updateTimeline();
      // this.tripService.trip = data as Trip;
      // @ts-ignore
      this.router.navigate(['/', 'planner', (data as Trip).id]);
      // console.log(data);
      console.log(new Date((data as Trip).destination.arrival));
    });
    // this.tripService.trip = trip;
    // this.router.navigate(["/", "planner", 123]);
    // console.log(this.tripDate);
  }

  generateTrip(): Trip {
    let trip: Trip;
    trip = {
      source: {
        location: {
          latitude: this.origin.geometry.location.lat(),
          longitude: this.origin.geometry.location.lng()
        },
        // @ts-ignore
        stopId: this.origin.place_id,
        name: this.origin.name,
        // @ts-ignore
        arrival: this.tripDate.toString(),
        // @ts-ignore
        departure: this.tripDate.toString(),
        hotels: [],
        attractions: []
      },
      destination: {
        location: {
          latitude: this.destination.geometry.location.lat(),
          longitude: this.destination.geometry.location.lng()
        },
        // @ts-ignore
        stopId: this.destination.place_id,
        name: this.destination.name,
        // @ts-ignore
        arrival: this.tripDate.toString(),
        // @ts-ignore
        departure: 'Mon Nov 13 2090 11:37:09 GMT+0530 (India Standard Time)',
        hotels: [],
        attractions: []
      },
      stops: [],
      mileage: this.vehicleMileage
    };
    return trip;
  }

  onMileageChange($event: Event) {
    this.vehicleMileage = +($event.target as HTMLInputElement).value;
  }
}
