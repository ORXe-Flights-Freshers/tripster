import { UtilityService } from '@services/utility.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-past-trip-item',
  templateUrl: './past-trip-item.component.html',
  styleUrls: ['./past-trip-item.component.css']
})
export class PastTripItemComponent implements OnInit {

  source = 'Source';
  destination = 'Destination';

  numberOfStops = 12;

  departureDate = new Date();
  arrivalDate = new Date();

  constructor(public utilityService: UtilityService) { }

  ngOnInit() {
  }

  getDepartureDate() {
    return this.utilityService.formatDateTime(this.departureDate);
  }

  getArrivalDate() {
    return this.utilityService.formatDateTime(this.arrivalDate);
  }

}
