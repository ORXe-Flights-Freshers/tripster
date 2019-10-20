import { Stop } from "./Stop";

export class Trip {
  tripId: Number;
  source: Stop;
  stops: Stop[];
  destination: Stop;
  mileage: Number;
}
