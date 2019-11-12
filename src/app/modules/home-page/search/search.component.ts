import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Time } from '../../../models/Time';
import { TripService } from 'src/app/services/trip.service';
import { Router } from '@angular/router';
import { Trip } from 'src/app/models/Trip';
import {TimePickerThemeService} from '../../../services/TimePickerTheme.service';

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
  tripDate: Date = new Date(Date.now());
  tripTime = '11:00 am';
  vehicleMileage = 22;
  invalidDepartureDateTimeError: boolean;

  searchForm = new FormGroup({
    mileage: new FormControl(this.vehicleMileage, [
      Validators.pattern('^[1-9]+[0-9]*$')
    ])
  });

  constructor(private tripService: TripService,
              private router: Router,
              public timePickerThemeService: TimePickerThemeService,
              private changeDetectRef: ChangeDetectorRef) {}

  ngOnInit() {}

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
    this.validateDateTime();
  }
  validateDateTime() {
    if(this.tripDate.getTime() < new Date(Date.now()).setSeconds(0))
      this.invalidDepartureDateTimeError=true;
    else
      this.invalidDepartureDateTimeError=false;
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

    console.log(trip);
    this.tripService.createTrip(trip).subscribe(data => {
      console.log(data);
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
        departure: this.tripDate.toString(),
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
