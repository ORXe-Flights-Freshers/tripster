import { Place } from "./Place";
import {Location} from "./Location";

export class Hotel implements Place {
  placeId: string;
  name: string;
  description: string;
  location: Location;
  arrival = "";
  departure = "";
  rating = 0;
}
