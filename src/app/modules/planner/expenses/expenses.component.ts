import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TripService } from '@services/trip.service';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  mileageOfCar: number;
  fuelCostPerLiter = 80;
  fuelPriceFromSource = false;
  @ViewChild('price', { static: false }) priceElement: ElementRef;
  @ViewChild('mileage', { static: false }) mileageElement: ElementRef;

  constructor(
    public tripService: TripService,
    public utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.mileageOfCar = this.tripService.trip.mileage;
    this.tripService.getFuelPrice().subscribe(fuelPrice => {
      if (fuelPrice as number !== -1) {
        this.fuelCostPerLiter = fuelPrice as number;
        this.fuelPriceFromSource = true;
      }
    });
  }

  onPriceInput(event: Event) {
    const currentValue = (event.target as HTMLInputElement).value;
    this.fuelPriceFromSource = false;
    if (this.utilityService.isValidPrice(currentValue) === false) {
      (this.priceElement.nativeElement as HTMLInputElement).value = '';
    }
  }

  onMileageInput(event: Event) {
    const currentValue = (event.target as HTMLInputElement).value;
    if (this.utilityService.isValidPrice(currentValue) === false) {
      (this.mileageElement.nativeElement as HTMLInputElement).value = '';
    }
  }

  getDistance() {
    return this.tripService.directionResult
      ? Math.round(this.tripService.calculateTotalDistance())
      : 0;
  }

  getFuelConsumption() {
    const totalFuel = this.tripService.trip
      ? this.getDistance() / this.mileageOfCar
      : 0;
    return Math.round(totalFuel);
  }

  getFuelCost() {
    const fuelCost = this.getFuelConsumption() * this.fuelCostPerLiter;
    return Math.round(fuelCost);
  }
}
