import * as tslib_1 from "tslib";
import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputErrorStateMatcher } from './ErrorMatcher';
let PlaceAutocompleteComponent = class PlaceAutocompleteComponent {
    constructor(mapsAPILoader, ngZone) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.validPlace = true;
        this.autoCompleteFormGroup = new FormGroup({
            inputPlace: new FormControl('', [Validators.nullValidator])
        });
        this.ErrorMatcher = new InputErrorStateMatcher(!this.validPlace);
        this.autoCompleteOptions = {
            types: ['(cities)'],
            componentRestrictions: { country: 'IN' }
        };
        this.IsValid = new EventEmitter();
        this.onPlaceChange = new EventEmitter();
        this.KeyPress = (event) => {
            this.validPlace = false;
            this.ErrorMatcher = new InputErrorStateMatcher(!this.validPlace);
            this.IsValid.emit({ isValid: false });
        };
    }
    ngOnInit() {
        // set google maps defaults
        // create search FormControl
        // this.searchControl = new FormControl();
        // //set current position
        // this.setCurrentPosition();
        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, this.autoCompleteOptions);
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place = autocomplete.getPlace();
                    // console.log(place);
                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        window.alert('Enter valid address');
                        return;
                    }
                    this.validPlace = true;
                    this.ErrorMatcher = new InputErrorStateMatcher(!this.validPlace);
                    this.IsValid.emit({ isValid: true });
                    this.onPlaceChange.emit(place);
                });
            });
        });
    }
};
tslib_1.__decorate([
    Input()
], PlaceAutocompleteComponent.prototype, "autoCompleteOptions", void 0);
tslib_1.__decorate([
    Input()
], PlaceAutocompleteComponent.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Output()
], PlaceAutocompleteComponent.prototype, "IsValid", void 0);
tslib_1.__decorate([
    Output()
], PlaceAutocompleteComponent.prototype, "onPlaceChange", void 0);
tslib_1.__decorate([
    ViewChild('search', { read: false, static: true })
], PlaceAutocompleteComponent.prototype, "searchElementRef", void 0);
PlaceAutocompleteComponent = tslib_1.__decorate([
    Component({
        selector: 'app-place-autocomplete',
        templateUrl: './place-autocomplete.component.html',
        styleUrls: ['./place-autocomplete.component.css']
    })
], PlaceAutocompleteComponent);
export { PlaceAutocompleteComponent };
//# sourceMappingURL=place-autocomplete.component.js.map