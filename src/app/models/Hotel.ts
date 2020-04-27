import {Place} from './Place';
import {Location} from './Location';

export interface Hotel extends Place {
  placeId: string;
  name: string;
  description: string;
  location: Location;
  arrival: string;
  departure: string;
  rating: number;
}
