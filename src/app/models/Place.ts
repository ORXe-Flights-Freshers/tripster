import { Location } from "./Location";

export class Place {
  placeId: number;
  name: string;
  description: string;
  location: Location;
  placeType: string;
  arrival: Date;
  departure: Date;
}
