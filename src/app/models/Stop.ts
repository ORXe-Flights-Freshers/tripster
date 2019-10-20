import { Location } from "./Location";
import { PlaceAutocompleteComponent } from "../shared/components/place-autocomplete/place-autocomplete.component";
import { Place } from "./Place";

export class Stop {
  stopId: Number;
  name: String;
  location: Location;
  arrival: Date;
  departure: Date;
  places: Place[];
}
