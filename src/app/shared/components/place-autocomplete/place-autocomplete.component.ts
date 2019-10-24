import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: "app-place-autocomplete",
  templateUrl: "./place-autocomplete.component.html",
  styleUrls: ["./place-autocomplete.component.css"]
})
export class PlaceAutocompleteComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;

  @Input() autoCompleteOptions: google.maps.places.AutocompleteOptions = {
    types: ["(cities)"],
    componentRestrictions: { country: "IN" }
  };

  @Input() placeholder: string;

  @Output() onPlaceChange = new EventEmitter();

  @ViewChild("search", { read: false, static: true })
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
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // console.log(place);
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            window.alert("Enter valid address");
            return;
          }
          this.onPlaceChange.emit(place);
        });
      });
    });
  }
}
