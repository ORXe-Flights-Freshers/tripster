import { Location } from "./Location";
import { Place } from "./Place";

export interface Stop {
  stopId: string;
  name: string;
  location: Location;
  arrival: string;
  departure: string;
  places: Place[];
}
