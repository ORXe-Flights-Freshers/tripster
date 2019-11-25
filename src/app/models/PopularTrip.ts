import { PopularTripStop } from './PopularTripStop';

export interface PopularTrip {
  id: string;
  source: PopularTripStop;
  destination: PopularTripStop;
  count: number;
}
