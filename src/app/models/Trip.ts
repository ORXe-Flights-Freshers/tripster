import { Stop } from "./Stop";

export interface Trip {
  id?: string;
  source: Stop;
  stops: Stop[];
  destination: Stop;
  mileage: number;
}
