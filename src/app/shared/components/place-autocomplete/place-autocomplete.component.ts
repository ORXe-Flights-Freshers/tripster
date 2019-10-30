import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { InputErrorStateMatcher } from './ErrorMatcher';
@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.css']
})
export class PlaceAutocompleteComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public validPlace: boolean = true;
public autoCompleteFormGroup = new FormGroup({
    inputPlace : new FormControl('', [Validators.nullValidator])
  });
  ErrorMatcher = new InputErrorStateMatcher(!this.validPlace);
  @Input() autoCompleteOptions: google.maps.places.AutocompleteOptions = {
    types: ['(cities)'],
    componentRestrictions: { country: 'IN' }
  };

  @Input() placeholder: string;
  @Output() IsValid = new EventEmitter(); 
  @Output() onPlaceChange = new EventEmitter();
  public KeyPress = (event) => {
    this.validPlace = false;
    this.ErrorMatcher = new InputErrorStateMatcher(!this.validPlace);
    this.IsValid.emit({isValid: false});
};

  @ViewChild('search', { read: false, static: true })
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit() {
    // set google maps defaults

    // create search FormControl
    // this.searchControl = new FormControl();

    // //set current position
    // this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        this.autoCompleteOptions
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // console.log(place);
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            window.alert('Enter valid address');
            return;
          }
          this.validPlace = true;
          this.ErrorMatcher = new InputErrorStateMatcher(!this.validPlace);
          this.IsValid.emit({isValid: true});
          this.onPlaceChange.emit(place);
        });
      });
    });
  }
}
