import { Location } from './Location';
import { Place } from './Place';
import { Attraction } from './Attraction';
import { Hotel } from './Hotel';

export interface Stop {
  stopId: string;
  name: string;
  location: Location;
  arrival: string;
  departure: string;
  hotels: Hotel[];
  attractions: Attraction[];
}
