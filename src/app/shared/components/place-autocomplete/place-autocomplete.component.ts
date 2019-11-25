import {Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {InputErrorStateMatcher} from './ErrorMatcher';

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.css']
})
export class PlaceAutocompleteComponent implements OnInit {
  @Input() value: string;

  constructor(private ngZone: NgZone, private mapsAPILoader: MapsAPILoader) {
  }

  public searchControl: FormControl;
  predictions: google.maps.places.AutocompletePrediction[];
  sessionToken: google.maps.places.AutocompleteSessionToken;
  autocompleteService: google.maps.places.AutocompleteService;
  placeService: google.maps.places.PlacesService;

  public validPlace = true;
  public inputPlaceFromUser = '';
  public errorMessage = '';
  public autoCompleteFormGroup = new FormGroup({
    inputPlace: new FormControl('', [Validators.required])
  });
  ErrorMatcher = new InputErrorStateMatcher(!this.validPlace);
  @Input() autoCompleteOptions: google.maps.places.AutocompleteOptions = {
    types: ['(cities)'],
    componentRestrictions: {country: 'IN'}
  };

  @Input() placeholder: string;
  @ViewChild('place', {static: false}) placeInputFormField;

  @Output() IsValid = new EventEmitter();
  @Output() placeChange = new EventEmitter();

  predictionDescriptionMapper = (prediction) => {
    if (prediction) {
      return prediction.description;
    }
  }

  public KeyPress = (event) => {
    this.inputPlaceFromUser = event.target.value;
    this.validPlace = false;
    this.ErrorMatcher = new InputErrorStateMatcher(!this.validPlace);
    this.IsValid.emit({isValid: false});
    if (this.inputPlaceFromUser.length < 1) {
      this.errorMessage = 'Please type at least 1 character';
    } else {
      this.errorMessage = 'Select from list';
    }
  }

  ngOnInit() {
    this.searchControl = new FormControl();

    this.searchControl.valueChanges.subscribe(query => {
      if (query.length < 1) {
        this.predictions = [];
      } else {
        this.getPredictions(query);
      }
    });

    this.mapsAPILoader.load().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placeService = new google.maps.places.PlacesService(
        document.createElement('div')
      );
    });
  }

  getPredictions(query: string) {
    // console.log(this.sessionToken);
    // this.autocompleteService = new google.maps.places.AutocompleteService();
    if (this.sessionToken === undefined) {
      this.sessionToken = new google.maps.places.AutocompleteSessionToken();
    }
    this.autocompleteService.getPlacePredictions(
      {
        input: query,
        sessionToken: this.sessionToken,
        types: ['(cities)'],
        componentRestrictions: {country: 'IN'}
      },
      (predictions, status) => this.setPredictions(predictions, status)
    );
  }

  setPredictions(
    predictions: google.maps.places.AutocompletePrediction[],
    status: google.maps.places.PlacesServiceStatus
  ) {
    this.ngZone.run(() => {
      this.predictions = [];
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        // alert(status);
        // console.log(status);
        return;
      }
      // console.log(predictions);

      predictions.forEach(prediction => {
        this.predictions.push(prediction);
      });
    });
  }

  onPlaceSelected(prediction: google.maps.places.AutocompletePrediction) {
    // console.log(option);
    const request = {
      placeId: prediction.place_id,
      sessionToken: this.sessionToken,
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
    this.placeService.getDetails(request, place => {
      // console.log(place);
      this.validPlace = true;
      if (this.validPlace === true) {
        this.ErrorMatcher = new InputErrorStateMatcher(!this.validPlace);
        this.IsValid.emit({isValid: true});
        this.placeInputFormField.nativeElement.blur();
      }
      this.placeChange.emit(place);
      this.sessionToken = new google.maps.places.AutocompleteSessionToken();
    });
  }
}
