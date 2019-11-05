import {Component, Input, OnInit} from '@angular/core';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  @Input() addStopComponentFunction;

  constructor(public tripService: TripService) {}

  ngOnInit() {}


}
