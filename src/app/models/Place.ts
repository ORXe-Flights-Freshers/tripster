import { Location } from './Location';

export interface Place {
  placeId: string;
  name: string;
  description: string;
  location: Location;
  arrival: string;
  departure: string;
  rating: number;
  imageUrl: string;
}
