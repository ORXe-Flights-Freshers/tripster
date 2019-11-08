import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  mileageOfCar: number;
  fuelCostPerLiter = 80;

  @ViewChild('price', { static: false }) priceElement: ElementRef;
  @ViewChild('mileage', { static: false }) mileageElement: ElementRef;

  constructor(public tripService: TripService) { }

  ngOnInit() {
    this.mileageOfCar = this.tripService.trip.mileage;
  }

  onPriceInput(event: Event) {
    const currentValue = (event.target as HTMLInputElement).value;
    const acceptablePattern = /^[1-9.]+[0-9.]*$/;

    if (acceptablePattern.test(currentValue) === false) {
      (this.priceElement.nativeElement as HTMLInputElement).value = '';
    }
  }

  onMileageInput(event: Event) {
    const currentValue = (event.target as HTMLInputElement).value;
    const acceptablePattern = /^[1-9.]+[0-9.]*$/;

    if (acceptablePattern.test(currentValue) === false) {
      (this.mileageElement.nativeElement as HTMLInputElement).value = '0';
    }
  }

  getDistance() {
     return this.tripService.directionResult ? Math.round(this.tripService.calculateTotalDistance()) : 0  ;
  }
  getFuelConsumption() {
    const totalFuel = this.tripService.trip ? this.getDistance() / this.mileageOfCar : 0;
    return Math.round(totalFuel) ;
  }

  getFuelCost() {
    const fuelCost = this.getFuelConsumption() * this.fuelCostPerLiter ;
    return Math.round(fuelCost) ;
  }
}
