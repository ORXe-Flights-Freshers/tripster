import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  distance: number;
  fuelCostPerLiter: number;
  constructor(public tripService: TripService) { }

  ngOnInit() {
  }

  getDistance() {
    console.log(this.tripService.directionResult);
    return this.tripService.directionResult ? Math.round(this.tripService.calculateTotalDistance()) : 0  ;
  }
  getFuelConsumption() {
    const totalFuel = this.tripService.trip ? this.getDistance() / this.tripService.trip.mileage : 0;
    return Math.round(totalFuel) ;
  }
  getFuelCost() {
    this.fuelCostPerLiter = 80;
    const fuelCost = this.getFuelConsumption() * this.fuelCostPerLiter ;
    return Math.round(fuelCost) ;
  }
}
