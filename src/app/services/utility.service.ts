import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  formatDateTime(dateObject: Date): string {
    const date = dateObject.toLocaleDateString();

    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';

    if (hours >= 13) {
      hours %= 12;
    }

    const hoursString = hours.toString().padStart(2, '0');
    return `${date}, ${hoursString}:${minutes} ${amPm}`;
  }

  isValidPrice(price: string) {
    const acceptablePattern = /^[1-9.]+[0-9.]*$/;
    return acceptablePattern.test(price);
  }
}
